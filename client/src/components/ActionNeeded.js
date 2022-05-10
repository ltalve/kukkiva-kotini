import {
  Box,
  IconButton,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { differenceInCalendarDays, differenceInCalendarMonths } from "date-fns";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";

function ActionNeeded(props) {
  let dateToday = new Date();

  const bufferToDeadline = 3;
  const bufferToDeadlineSoil = 2;

  function isThirsty(plant) {
    console.log(plant.waterDeadline);
    console.log(dateToday);

    console.log(differenceInCalendarDays(plant.waterDeadline, dateToday));
    console.log(bufferToDeadline);
    console.log(plant.waterIntervalDays);
    return (
      differenceInCalendarDays(plant.waterDeadline, dateToday) <
        bufferToDeadline && plant.waterIntervalDays > 0
    );
  }

  function isUnnourished(plant) {
    return (
      differenceInCalendarDays(plant.nutrDeadline, dateToday) <
        bufferToDeadline && plant.nutrIntervalDays > 0
    );
  }

  function isUnsoiled(plant) {
    return (
      differenceInCalendarMonths(plant.soilDeadline, dateToday) <
        bufferToDeadlineSoil && plant.soilIntervalMonths > 0
    );
  }

  function updateLastWater(plantid) {
    const wateredPlant = props.plantList.filter((plant) => {
      return plantid === plant.plantId;
    })[0];

    if (wateredPlant) {
      const plantWithUpdatedLastWater = {
        ...wateredPlant,
        lastWater: new Date(),
        waterDeadline: addDays(new Date(), wateredPlant.waterIntervalDays),
      };
      const plantListWithEditedPlantRemoved = props.plantList.filter(
        (plant) => plant.plantId !== plantid
      );
      props.setPlantList([
        plantWithUpdatedLastWater,
        ...plantListWithEditedPlantRemoved,
      ]);
      props.savePlantList();
    }
  }

  function updateLastNutr(plantid) {
    const nurturedPlant = props.plantList.filter((plant) => {
      return plantid === plant.plantId;
    })[0];

    if (nurturedPlant) {
      const plantWithUpdatedLastNutr = {
        ...nurturedPlant,
        lastNutr: new Date(),
        nutrDeadline: addDays(new Date(), nurturedPlant.nutrIntervalDays),
      };
      const plantListWithEditedPlantRemoved = props.plantList.filter(
        (plant) => plant.plantId !== plantid
      );

      props.setPlantList([
        plantWithUpdatedLastNutr,
        ...plantListWithEditedPlantRemoved,
      ]);
      props.savePlantList();
    }
  }

  function updateLastSoil(plantid) {
    const soiledPlant = props.plantList.filter((plant) => {
      return plantid === plant.plantId;
    })[0];

    if (soiledPlant) {
      const plantWithUpdatedLastSoil = {
        ...soiledPlant,
        lastSoil: new Date(),
        soilDeadline: addMonths(new Date(), soiledPlant.soilIntervalMonths),
      };
      const plantListWithEditedPlantRemoved = props.plantList.filter(
        (plant) => plant.plantId !== plantid
      );

      props.setPlantList([
        plantWithUpdatedLastSoil,
        ...plantListWithEditedPlantRemoved,
      ]);
      props.savePlantList();
    }
  }

  // Sorting to do lists by date

  let theThirsty = props.plantList
    .filter(isThirsty)
    .sort((a, b) => a.waterDeadline - b.waterDeadline);
  console.log("theThirsty: ", theThirsty);

  let theUnnourished = props.plantList
    .filter(isUnnourished)
    .sort((a, b) => a.nutrDeadline - b.nutrDeadline);

  let theUnsoiled = props.plantList
    .filter(isUnsoiled)
    .sort((a, b) => a.soilDeadline - b.soilDeadline);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: "80%",
          margin: "auto",
          alignItems: "center",
          pt: "20px",
          pb: "20px",
          backgroundColor: "rgba(253, 254, 254, 0.9)",
          borderRadius: "3px",
        }}
      >
        {theThirsty.length === 0 &&
        theUnnourished.length === 0 &&
        theUnsoiled.length === 0 ? (
          <Typography
            variant="h4"
            style={{ color: "#2E7D32", marginBottom: 10 }}
          >
            Kasviasiat reilassa!
          </Typography>
        ) : (
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Kasvisi haluavat huomiota!
          </Typography>
        )}

        <Typography style={{ color: "#666666", marginBottom: 0 }}>
          Tänään on {format(dateToday, "d.M.y")}.
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        sx={{
          width: "80%",
          paddingTop: "5px",
          paddingBottom: "0px",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            width: "100%",
            mt: "5px",
            mr: "10px",
            padding: "20px",
            backgroundColor: "rgba(253, 254, 254, 0.95)",
            borderRadius: "3px",
          }}
        >
          <Typography variant="h5" align="center" style={{ marginTop: 10 }}>
            Kastele
          </Typography>

          <List>
            {theThirsty.length > 0 ? (
              theThirsty.map((plant, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={plant.plantName}
                    secondary={
                      <>Viimeistään {format(plant.waterDeadline, "d.M.y")}</>
                    }
                  />
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      edge="end"
                      onClick={() => {
                        updateLastWater(plant.plantId);
                      }}
                    >
                      {differenceInCalendarDays(
                        plant.waterDeadline,
                        new Date()
                      ) >= 0 ? (
                        <CheckBoxOutlineBlankIcon />
                      ) : (
                        <Badge badgeContent="!" color="warning">
                          <CheckBoxOutlineBlankIcon />
                        </Badge>
                      )}
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))
            ) : (
              <Typography
                align="center"
                style={{ marginTop: 20, color: "#2E7D32" }}
              >
                Kaikki kasvit kasteltu
              </Typography>
            )}
          </List>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            width: "100%",
            mt: "5px",
            mr: "10px",
            padding: "20px",
            backgroundColor: "rgba(253, 254, 254, 0.95)",
            borderRadius: "3px",
            alignContent: "center",
          }}
        >
          <Typography variant="h5" align="center" style={{ marginTop: 10 }}>
            Lannoita
          </Typography>

          <List>
            {theUnnourished.length > 0 ? (
              theUnnourished.map((plant, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={<>{plant.plantName}</>}
                    secondary={
                      <>Viimeistään: {format(plant.nutrDeadline, "d.M.y")}</>
                    }
                  />
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      edge="end"
                      onClick={() => {
                        updateLastNutr(plant.plantId);
                      }}
                    >
                      {differenceInCalendarDays(
                        plant.nutrDeadline,
                        new Date()
                      ) >= 0 ? (
                        <CheckBoxOutlineBlankIcon />
                      ) : (
                        <Badge badgeContent="!" color="warning">
                          <CheckBoxOutlineBlankIcon />
                        </Badge>
                      )}
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))
            ) : (
              <Typography
                align="center"
                style={{ marginTop: 20, color: "#2E7D32" }}
              >
                Kaikki kasvit lannoitettu
              </Typography>
            )}
          </List>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            width: "100%",
            mt: "5px",
            padding: "20px",
            backgroundColor: "rgba(253, 254, 254, 0.95)",
            borderRadius: "3px",
            alignContent: "center",
          }}
        >
          <Typography variant="h5" align="center" style={{ marginTop: 10 }}>
            Vaihda multa
          </Typography>

          <List>
            {theUnsoiled.length > 0 ? (
              theUnsoiled.map((plant, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={<>{plant.plantName}</>}
                    secondary={
                      <>Viimeistään: {format(plant.soilDeadline, "d.M.y")}</>
                    }
                  />
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      edge="end"
                      onClick={() => {
                        updateLastSoil(plant.plantId);
                      }}
                    >
                      {differenceInCalendarDays(
                        plant.soilDeadline,
                        new Date()
                      ) >= 0 ? (
                        <CheckBoxOutlineBlankIcon />
                      ) : (
                        <Badge badgeContent="!" color="warning">
                          <CheckBoxOutlineBlankIcon />
                        </Badge>
                      )}
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))
            ) : (
              <Typography
                align="center"
                style={{ marginTop: 20, color: "#2E7D32" }}
              >
                Multa-asiat kunnossa
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default ActionNeeded;

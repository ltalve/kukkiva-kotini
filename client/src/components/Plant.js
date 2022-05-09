import { Box, Typography } from "@mui/material";
import format from "date-fns/format";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import parseISO from "date-fns/parseISO";

function Plant(props) {
  console.log(props.plant);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
        borderRadius: "3px",
        marginBottom: "10px",
        backgroundColor: "rgba(253, 254, 254, 0.95)",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Box width="15%"></Box>
        <Box width="70%">
          <Typography
            variant="h4"
            marginTop="10px"
            marginBottom="10px"
            color="#2E7D32"
            align="center"
          >
            {props.plant.plantName}
          </Typography>
        </Box>
        <Box
          width="15%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
        >
          <IconButton
            component={Link}
            to={`/muokkaakasvia/${props.plant.plantId}`}
            color="secondary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/poistakasvi/${props.plant.plantId}`}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          width="30%"
          marginLeft="10px"
          marginRight="10px"
          marginBottom="10px"
        >
          <Typography variant="h6" align="center" marginBottom="10px">
            Kastelu
          </Typography>
          {props.plant.waterIntervalDays > 0 && (
            <Typography align="center">
              <>
                Väli: {props.plant.waterIntervalDays} päivää
                <br />
                Edellinen: {format(props.plant.lastWater, "d.M.y")}
                <br />
                Seuraava:
                {format(props.plant.waterDeadline, "d.M.y")}
              </>
            </Typography>
          )}
          {!props.plant.waterIntervalDays && (
            <Typography align="center" color="#666666">
              Ei kastelutietoja
            </Typography>
          )}
        </Box>
        <Box width="30%" marginRight="10px">
          <Typography variant="h6" align="center" marginBottom="10px">
            Lannoitus
          </Typography>

          {props.plant.nutrIntervalDays > 0 && (
            <Typography align="center">
              <>
                Väli: {props.plant.nutrIntervalDays} päivää
                <br />
                Edellinen: {format(props.plant.lastNutr, "d.M.y")}
                <br />
                Seuraava: {format(props.plant.nutrDeadline, "d.M.y")}
              </>
            </Typography>
          )}
          {!props.plant.nutrIntervalDays && (
            <Typography align="center" color="#666666">
              Ei lannoitustietoja
            </Typography>
          )}
        </Box>
        <Box width="30%" marginRight="10px">
          <Typography variant="h6" align="center" marginBottom="10px">
            Multa
          </Typography>
          {props.plant.soilIntervalMonths > 0 && (
            <Typography align="center">
              <>
                Vaihtoväli: {props.plant.soilIntervalMonths} kuukautta
                <br />
                Edellinen: {format(props.plant.lastSoil, "d.M.y")}
                <br />
                Seuraava: {format(props.plant.soilDeadline, "d.M.y")}
              </>
            </Typography>
          )}
          {!props.plant.soilIntervalMonths && (
            <Typography align="center" color="#666666">
              Ei multatietoja
            </Typography>
          )}
        </Box>
      </Box>

      {props.plant.info && (
        <Box width="100%" marginBottom="10px" align="center">
          <Typography
            variant="h6"
            align="center"
            marginTop="20px"
            marginBottom="5px"
          >
            Lisätiedot: <br />
          </Typography>
          <Typography align="center">{props.plant.info}</Typography>
        </Box>
      )}

      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        marginTop="20px"
      >
        <Typography color="#666666" fontSize="0.8rem">
          Kasvi lisätty: {format(props.plant.createdAt, "d.M.y H:mm")}
        </Typography>
        <Typography color="#666666" fontSize="0.8rem">
          Viimeksi muokattu: {format(props.plant.updatedAt, "d.M.y H:mm")}
        </Typography>
      </Box>
    </Box>
  );
}

export default Plant;

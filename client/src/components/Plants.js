import { Box, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Plant from "./Plant";

function Plants(props) {
  const history = useHistory();

  const navigateToNew = (e) => {
    e.preventDefault();
    history.push("/uusikasvi");
  };

  // Sorting the plant list ascending with Finnish alphabet

  props.plantList.sort((a, b) => a.name.localeCompare(b.name, "fi"));

  return (
    <>
      <Box p="0px" width="60%" margin="auto">
        <Box
          width="100%"
          margin="auto"
          mt="10px"
          pt="30px"
          pb="1px"
          backgroundColor="rgba(253, 254, 254, 0.9)"
          borderRadius="3px"
        >
          {!props.plantList ||
            (!props.plantList.length && (
              <Typography variant="h6" align="center" marginBottom="20px">
                Et ole vielä tallentanut kasveja. <br />
                Aloita sovelluksen käyttö allaolevasta napista.
              </Typography>
            ))}

          {props.plantList && props.plantList.length > 0 && (
            <Typography
              variant="h4"
              align="center"
              style={{ marginBottom: 30 }}
            >
              Koko kasviloistoni
            </Typography>
          )}
        </Box>

        <Box width="100%" margin="auto" mt="10px" pb="10px" borderRadius="3px">
          {props.plantList.map((plant) => {
            return (
              <Plant key={plant.id} plantList={props.plantList} plant={plant} />
            );
          })}
        </Box>

        <Box
          width="97%"
          margin="auto"
          marginTop="10px"
          p="10px"
          backgroundColor="rgba(253, 254, 254, 0.9)"
          borderRadius="3px"
        >
          <Button
            variant="contained"
            disableElevation
            color="success"
            onClick={navigateToNew}
            fullWidth
          >
            Lisää uusi kasvi
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Plants;

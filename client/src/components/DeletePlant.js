import { Box, Typography, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function DeletePlant(props) {
  const history = useHistory();
  const { id } = useParams();

  if (!props.plantList || !props.plantList.length) {
    return null;
  }

  console.log(props.plantList);

  const deletedPlant = props.plantList.filter((plant) => {
    return plant.plantId === Number(id);
  })[0];

  console.log(deletedPlant);

  const handleForm = (e) => {
    e.preventDefault();

    let plantListHelp = props.plantList.filter((plant, idx) => {
      return plant.plantId !== Number(id);
    });

    props.setPlantList([...plantListHelp]);

    history.push("/kasvit");
  };

  return (
    <Box width="50%" margin="auto">
      <Box
        width="100%"
        margin="auto"
        mt="10px"
        pt="30px"
        pl="20px"
        pr="20px"
        pb="1px"
        backgroundColor="rgba(253, 254, 254, 0.9)"
        borderRadius="3px"
      >
        <Typography variant="h4" align="center" style={{ marginBottom: 30 }}>
          Kasvin poisto
        </Typography>
      </Box>

      <Box
        width="100%"
        margin="auto"
        mt="10px"
        p="20px"
        backgroundColor="rgba(253, 254, 254, 0.9)"
        borderRadius="3px"
      >
        <form onSubmit={handleForm}>
          <Typography
            variant="h5"
            align="center"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Poistetaanko kasvi {deletedPlant.name}?
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="warning"
            style={{ marginBottom: 20, marginTop: 30 }}
            fullWidth
            endIcon={<DeleteIcon />}
          >
            Poista kasvi
          </Button>

          <Button
            component={Link}
            to="/kasvit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Peruuta
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default DeletePlant;

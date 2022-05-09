import { Box, Typography, Button, TextField } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import format from "date-fns/format";
import SaveIcon from "@mui/icons-material/Save";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { fi } from "date-fns/locale";
import { useState } from "react";
import { updatePlant } from "../services/plantService";

function EditPlant(props) {
  const history = useHistory();
  const { id } = useParams();

  const editedPlant = props.plantList.filter(
    (plant) => plant.plantId === Number(id)
  )[0];

  console.log(editedPlant);

  let editedPlantName;
  let editedWaterIntervalDays;
  let editedWaterDeadline;
  let editedNutrIntervalDays;
  let editedNutrDeadline;
  let editedSoilIntervalMonths;
  let editedSoilDeadline;
  let editedInfo;

  const [tempLastWater, setTempLastWater] = useState(editedPlant.lastWater);
  const [tempLastNutr, setTempLastNutr] = useState(editedPlant.lastNutr);
  const [tempLastSoil, setTempLastSoil] = useState(editedPlant.lastSoil);

  const editPlantName = (e) => {
    e.preventDefault();
    editedPlantName = e.target.value;
    // editedPlant.plantName = e.target.value;
  };

  const editInfo = (e) => {
    e.preventDefault();
    editedInfo = e.target.value;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editedPlantName) {
      editedPlant.plantName = editedPlantName;
    }

    if (editedInfo) {
      editedPlant.info = editedInfo;
    }

    if (editedWaterIntervalDays) {
      editedPlant.waterIntervalDays = editedWaterIntervalDays;
      editedWaterDeadline = addDays(
        new Date(editedPlant.lastWater),
        editedWaterIntervalDays
      ).toISOString();
      editedPlant.waterDeadline = editedWaterDeadline;
    } else {
      editedPlant.waterIntervalDays = 0;
      editedPlant.waterDeadline = null;
      editedPlant.lastWater = null;
    }

    if (tempLastWater) {
      editedPlant.lastWater = tempLastWater;
      editedWaterDeadline = addDays(
        tempLastWater,
        editedPlant.waterIntervalDays
      );
      editedPlant.waterDeadline = editedWaterDeadline;
    }

    if (editedNutrIntervalDays) {
      editedPlant.nutrIntervalDays = editedNutrIntervalDays;
      editedNutrDeadline = addDays(
        new Date(editedPlant.lastNutr),
        editedPlant.nutrIntervalDays
      ).toISOString();
      editedPlant.nutrDeadline = editedNutrDeadline;
    }

    if (tempLastNutr) {
      editedPlant.lastNutr = tempLastNutr;
      editedNutrDeadline = addDays(tempLastNutr, editedPlant.nutrIntervalDays);
      editedPlant.nutrDeadline = editedNutrDeadline;
    }

    if (editedSoilIntervalMonths) {
      editedPlant.soilIntervalMonths = editedSoilIntervalMonths;
      editedSoilDeadline = addMonths(
        new Date(editedPlant.lastSoil),
        editedPlant.soilIntervalMonths
      ).toISOString();
      editedPlant.soilDeadline = editedSoilDeadline;
    }

    if (tempLastSoil) {
      editedPlant.lastSoil = tempLastSoil;
      editedSoilDeadline = addMonths(
        tempLastSoil,
        editedPlant.soilIntervalMonths
      );
      editedPlant.soilDeadline = editedSoilDeadline;
    }

    console.log("-----------------------------------------------");
    console.log(editedPlant);
    console.log("-----------------------------------------------");

    updatePlant(id, editedPlant);

    props.savePlantList();

    history.push("/kasvit");
  };

  return (
    <Box width="50%" margin="auto">
      <Box
        width="100%"
        margin="auto"
        mt="10px"
        pt="30px"
        pl="25px"
        pr="25px"
        pb="1px"
        backgroundColor="rgba(253, 254, 254, 0.9)"
        borderRadius="3px"
      >
        <Typography variant="h4" align="center" style={{ marginBottom: 30 }}>
          Kasvin tietojen muokkaus
        </Typography>
      </Box>

      <Box
        width="100%"
        margin="auto"
        mt="10px"
        pl="20px"
        pr="30px"
        pt="20px"
        backgroundColor="rgba(253, 254, 254, 0.9)"
        borderRadius="3px"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
          <form onSubmit={submitForm}>
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography marginTop={5}>Kasvin nimi: </Typography>

              <TextField
                name="name"
                variant="outlined"
                style={{ marginBottom: 20 }}
                defaultValue={editedPlant.plantName}
                fullWidth
                onChange={editPlantName}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin kastelu:{" "}
              </Typography>

              <DatePicker
                aria-label="editLastWatered"
                value={tempLastWater}
                style={{ marginBottom: 20 }}
                onChange={(date) => {
                  setTempLastWater(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography style={{ marginTop: "20px" }}>
                Kasvin kasteluväli (pv):{" "}
              </Typography>
              <Typography fontSize={"0.8rem"} color="#666666">
                Jos kasteluväli on 0 päivää, kastelumuistutuksia ei voida antaa.{" "}
              </Typography>

              <Slider
                aria-label="waterInterval"
                defaultValue={editedPlant.waterIntervalDays}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={30}
                onChange={(e) => {
                  editedWaterIntervalDays = e.target.value;
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin lannoitus:{" "}
              </Typography>

              <DatePicker
                aria-label="lastNutr"
                value={tempLastNutr}
                style={{ marginBottom: 20 }}
                onChange={(date) => {
                  setTempLastNutr(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography>Kasvin lannoitusväli (pv): </Typography>
              <Typography fontSize={"0.8rem"} color="#666666">
                Jos lannoitusväli on 0 päivää, lannoitusmuistutuksia ei voida
                antaa.{" "}
              </Typography>

              <Slider
                aria-label="nutrInterval"
                defaultValue={editedPlant.nutrIntervalDays}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={30}
                onChange={(e) => {
                  editedNutrIntervalDays = e.target.value;
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin multienvaihto:{" "}
              </Typography>

              <DatePicker
                aria-label="lastSoil"
                value={tempLastSoil}
                style={{ marginBottom: 20 }}
                onChange={(date) => {
                  setTempLastSoil(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography marginTop={5}>
                Kasvin mullanvaihtoväli (kk):{" "}
              </Typography>
              <Typography fontSize={"0.8rem"} color="#666666">
                Jos multienvaihtoväli on 0 kuukautta, muistutuksia
                mullanvaihdosta ei voida antaa.{" "}
              </Typography>

              <Slider
                aria-label="nutrInterval"
                defaultValue={editedPlant.soilIntervalMonths}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={36}
                onChange={(e) => {
                  editedSoilIntervalMonths = e.target.value;
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Lisätietoa kasvista:{" "}
              </Typography>

              <TextField
                name="info"
                variant="outlined"
                defaultValue={editedPlant.info}
                fullWidth
                multiline
                style={{ marginBottom: 30 }}
                onChange={editInfo}
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{ marginTop: 30 }}
                fullWidth
                endIcon={<SaveIcon />}
              >
                Tallenna muokkaukset
              </Button>

              <Button
                component={Link}
                to="/kasvit"
                variant="contained"
                color="secondary"
                fullWidth
                style={{ marginBottom: 30 }}
              >
                Peruuta
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}

export default EditPlant;

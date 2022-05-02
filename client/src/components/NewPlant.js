import { Box, Typography, Button, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { addMonths } from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { fi } from "date-fns/locale";

function NewPlant(props) {
  const history = useHistory();

  const [plantId] = useState(uuidv4());
  const [insertDate] = useState(format(new Date(), "d.M.y HH:mm"));
  const [lastEditDate] = useState(format(new Date(), "d.M.y HH:mm"));
  const [name, setName] = useState();
  const [waterInterval, setWaterInterval] = useState(null);
  const [lastWater, setLastWater] = useState(new Date());
  const [nutrInterval, setNutrInterval] = useState(null);
  const [lastNutr, setLastNutr] = useState(new Date());
  const [soilInterval, setSoilInterval] = useState(null);
  const [lastSoil, setLastSoil] = useState(new Date());
  const [info, setInfo] = useState();

  const newPlant = {
    id: plantId,
    insertDate: insertDate,
    lastEditDate: lastEditDate,
    name: name,
    waterInterval: waterInterval,
    lastWater: lastWater,
    waterDeadline: null,
    nutrInterval: nutrInterval,
    lastNutr: lastNutr,
    nutrDeadline: null,
    soilInterval: soilInterval,
    lastSoil: lastSoil,
    soilDeadline: null,
    info: info,
  };

  const [errorMsg, setErrorMsg] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    newPlant.waterDeadline = addDays(lastWater, waterInterval);
    newPlant.nutrDeadline = addDays(lastNutr, nutrInterval);
    newPlant.soilDeadline = addMonths(lastSoil, soilInterval);

    if (!newPlant.name) {
      errors = { ...errors, name: "Kasvin nimi on pakollinen tieto." };
    }
    //lisää virhe, jos nimi jo käytössä

    if (Object.entries(errors).length > 0) {
      setErrorMsg({ ...errors });
    } else {
      setErrorMsg({});
      props.addPlant(newPlant);
      history.push("/kasvit");
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleInfo = (e) => {
    e.preventDefault();
    setInfo(e.target.value);
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
          Lisää uusi kasvi
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
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography>Kasvin nimi: * </Typography>

              <TextField
                name="name"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 20 }}
                error={Boolean(errorMsg.name)}
                helperText={errorMsg.name}
                onChange={handleName}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin kastelu:{" "}
              </Typography>

              <DatePicker
                aria-label="lastWater"
                value={lastWater}
                onChange={(date) => {
                  setLastWater(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography>Kasvin kasteluväli (pv): </Typography>
              <Typography fontSize={"0.8rem"} color="#666666">
                Syötä, jos haluat kastelumuistutukset.{" "}
              </Typography>

              <Slider
                aria-label="waterInterval"
                defaultValue={0}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={30}
                onChange={(e) => {
                  setWaterInterval(e.target.value);
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin lannoitus:{" "}
              </Typography>

              <DatePicker
                aria-label="lastNutr"
                value={lastNutr}
                onChange={(date) => {
                  setLastNutr(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography>Kasvin lannoitusväli (pv): </Typography>
              <Typography fontSize={12} color="#666666">
                Syötä, jos haluat lannoitusmuistutukset.{" "}
              </Typography>

              <Slider
                aria-label="nutrInterval"
                defaultValue={0}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={30}
                onChange={(e) => {
                  setNutrInterval(e.target.value);
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Viimeisin mullanvaihto:{" "}
              </Typography>

              <DatePicker
                aria-label="lastSoil"
                value={lastSoil}
                onChange={(date) => {
                  setLastSoil(date);
                }}
                disableFuture={true}
                format="d.M.y"
                mask="_._.____"
                renderInput={(params) => <TextField {...params} />}
              />

              <Typography>Kasvin mullanvaihtoväli (kk): </Typography>
              <Typography fontSize={12} color="#666666">
                Syötä, jos haluat muistutukset mullanvaihdosta.{" "}
              </Typography>

              <Slider
                aria-label="soilInterval"
                defaultValue={0}
                valueLabelDisplay="auto"
                color="secondary"
                step={1}
                marks
                min={0}
                max={36}
                onChange={(e) => {
                  setSoilInterval(e.target.value);
                }}
              />

              <Typography style={{ marginTop: "20px" }}>
                Lisätietoa kasvista:{" "}
              </Typography>

              <TextField
                name="info"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 30 }}
                multiline
                onChange={handleInfo}
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth={true}
                size="large"
                style={{ marginBottom: "40px", marginTop: "30px" }}
              >
                Tallenna kasvi
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}

export default NewPlant;

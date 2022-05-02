import React from "react";
import { Route } from "react-router-dom";
import bg_img from "./images/bg_img.jpg";
import Header from "./components/Header";
import NewPlant from "./components/NewPlant";
import Plants from "./components/Plants";
import ActionNeeded from "./components/ActionNeeded";
import WelcomeToNew from "./components/WelcomeToNew";
import EditPlant from "./components/EditPlant";
import DeletePlant from "./components/DeletePlant";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { parseISO } from "date-fns";
import format from "date-fns/format";

function App() {
  const [plantList, setPlantList] = useState([]);

  const addPlant = (plant) => {
    setPlantList([plant, ...plantList]);
  };

  const savePlantList = () => {
    // console.log(`savePlantList`);
    localStorage.setItem("plantList", JSON.stringify(plantList));
  };

  const [fetchStatus, setFetchStatus] = useState({
    error: "",
    loading: true,
  });

  const openPlantList = async () => {
    try {
      const yhteys = await fetch("http://localhost:3109/api/plants");
      if (yhteys.status === 200) {
        console.log("Yhteys OK");
        setPlantList(await yhteys.json());
        setFetchStatus({
          error: "",
          loading: false,
        });
      } else {
        let error = "";
        switch (yhteys.status) {
          case 404:
            error = `Palvelimeen ei saada yhteyttä (virhekoodi ${yhteys.status})`;
            break;
          default:
            error = `Palvelimella tapahtui odottamaton virhe. (virhekoodi ${yhteys.status})`;
            break;
        }

        setFetchStatus({
          error: error,
          loading: false,
        });
      }
    } catch (e) {
      setFetchStatus({
        error: "Palvelimeen ei saada yhteyttä.",
        loading: false,
      });
    }
  };

  useEffect(() => {
    openPlantList();
  }, []);

  useEffect(() => {
    savePlantList();
  }, [fetchStatus]);

  if (fetchStatus.loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  // const s = format(parseISO(plantList[0].lastWater), "d.M.y");
  // console.log(s);

  return (
    <Container
      style={{
        padding: "0",
        width: "100%",
        height: "auto",
        backgroundImage: `url(${bg_img})`,
        backgroundSize: "cover",
        backgroundPosition: "top left",
        borderRadius: "3px",
      }}
    >
      <Header />
      <Route path="/kasvit">
        <Plants plantList={plantList} />
      </Route>
      <Route path="/uusikasvi">
        <NewPlant addPlant={addPlant} />
      </Route>
      <Route path="/ajankohtaista">
        <>
          {!plantList || !plantList.length ? (
            <WelcomeToNew />
          ) : (
            <ActionNeeded
              plantList={plantList}
              setPlantList={setPlantList}
              addPlant={addPlant}
              savePlantList={savePlantList}
            />
          )}
        </>
      </Route>
      <Route path="/muokkaakasvia/:id">
        <>
          {!plantList || !plantList.length ? null : (
            <EditPlant
              plantList={plantList}
              savePlantList={savePlantList}
              setPlantList={setPlantList}
            />
          )}
        </>
      </Route>
      <Route path="/poistakasvi/:id">
        <DeletePlant plantList={plantList} setPlantList={setPlantList} />
      </Route>
      <Route path="/" exact>
        <>
          {!plantList || !plantList.length ? (
            <WelcomeToNew />
          ) : (
            <ActionNeeded
              plantList={plantList}
              setPlantList={setPlantList}
              addPlant={addPlant}
              savePlantList={savePlantList}
            />
          )}
        </>
      </Route>
      <Footer />
    </Container>
  );
}

export default App;

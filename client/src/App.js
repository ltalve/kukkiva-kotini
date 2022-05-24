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
import { getPlants, addPlant } from "./services/plantService";

function App() {
  const [plantList, setPlantList] = useState([]);

  const addPlantToPlantList = async (plant) => {
    await addPlant(plant);
    openPlantList();
  };

  const [fetchStatus, setFetchStatus] = useState({
    error: "",
    loading: true,
  });

  const openPlantList = async () => {
    try {
      setPlantList(await getPlants());
      setFetchStatus({
        error: "",
        loading: false,
      });
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

  if (fetchStatus.loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
        <NewPlant addPlant={addPlantToPlantList} />
      </Route>
      <Route path="/ajankohtaista">
        <>
          {!plantList || !plantList.length ? (
            <WelcomeToNew />
          ) : (
            <ActionNeeded plantList={plantList} openPlantList={openPlantList} />
          )}
        </>
      </Route>
      <Route path="/muokkaakasvia/:id">
        <>
          {!plantList || !plantList.length ? null : (
            <EditPlant plantList={plantList} setPlantList={setPlantList} />
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
            <ActionNeeded plantList={plantList} openPlantList={openPlantList} />
          )}
        </>
      </Route>
      <Footer />
    </Container>
  );
}

export default App;

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
import { parseISO } from "date-fns";

function App() {
  const [plantList, setPlantList] = useState([]);

  const addPlant = (plant) => {
    setPlantList([plant, ...plantList]);
  };

  const savePlantList = () => {
    // console.log(`savePlantList`);
    localStorage.setItem("plantList", JSON.stringify(plantList));
  };

  const openPlantList = () => {
    // console.log(`openPlantList`);
    const tmpList = JSON.parse(localStorage.getItem("plantList"));
    if (tmpList) {
      const datedTmpList = tmpList.map((plant) => {
        return {
          ...plant,
          lastWater: parseISO(plant.lastWater),
          waterDeadline: parseISO(plant.waterDeadline),
          lastNutr: parseISO(plant.lastNutr),
          nutrDeadline: parseISO(plant.nutrDeadline),
          lastSoil: parseISO(plant.lastSoil),
          soilDeadline: parseISO(plant.soilDeadline),
        };
      });
      setPlantList(datedTmpList);
    } else {
      // console.log("local storage list set to empty");
      setPlantList([]);
    }
  };

  useEffect(() => {
    openPlantList();
  }, []);

  useEffect(() => {
    savePlantList();
  }, [plantList]);

  if (!plantList) return <div>Ei kasveja</div>;

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

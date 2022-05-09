const getPlants = async () => {
  try {
    const response = await fetch("http://localhost:3109/api/plants");
    if (response.status === 200) {
      const plantsFromDb = (await response.json()).map((plant) => {
        return {
          plantId: plant.plantId,
          createdAt: new Date(plant.createdAt),
          updatedAt: new Date(plant.updatedAt),
          plantName: plant.plantName,
          waterIntervalDays: plant.waterIntervalDays,
          lastWater: new Date(plant.lastWater),
          waterDeadline: new Date(plant.waterDeadline),
          nutrIntervalDays: plant.nutrIntervalDays,
          lastNutr: new Date(plant.lastNutr),
          nutrDeadline: new Date(plant.nutrDeadline),
          soilIntervalMonths: plant.soilIntervalMonths,
          lastSoil: new Date(plant.lastSoil),
          soilDeadline: new Date(plant.soilDeadline),
          info: plant.info,
        };
      });
      return plantsFromDb;
    } else {
      throw new Error(
        `Palvelimella tapahtui virhe ${response.error} (${response.status})`
      );
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const deletePlant = async (plantId) => {
  try {
    await fetch("http://localhost:3109/api/plants/" + plantId, {
      method: "DELETE",
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const addPlant = async (plant) => {
  try {
    await fetch("http://localhost:3109/api/plants/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updatePlant = async (id, plant) => {
  try {
    await fetch("http://localhost:3109/api/plants/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { getPlants, deletePlant, addPlant, updatePlant };

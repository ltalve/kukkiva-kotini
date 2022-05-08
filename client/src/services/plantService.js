const getPlants = async () => {
  try {
    const response = await fetch("http://localhost:3109/api/plants");
    if (response.status === 200) {
      const plantList = await response.json();
      return plantList;
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

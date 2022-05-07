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

export { getPlants, deletePlant };

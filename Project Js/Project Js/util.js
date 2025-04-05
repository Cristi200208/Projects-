const writeToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const addFlatsFavorite = () => {
  const noFlatMessage = document.getElementById("noFlatMessage");
  const loggedInUserRenderFav = readFromLS("loggedInUser") || {};
  console.log(loggedInUserRenderFav);
  const favoritesUserReder = loggedInUserRenderFav["usersFavoritesFirst"] || [];
  const map = favoritesUserReder.map((element) => element);
  console.log(map);
  if (map.length === 0) {
    noFlatMessage.style.display = "flex";
  }
  flatContainer.innerHTML = "";

  favoritesUserReder.forEach((element, index) => {
    const flatDiv = document.createElement("div");
    flatDiv.classList = "render-flats";
    flatDiv.innerHTML = `<img src="./house-Img.jpg" >
    <div class="render-flats-content"> <p>City: ${element.cityInput}</p>
  <p>Street Name: ${element.streetNameInput}</p>
  <p>Street Number: ${element.streetNumberInput}</p>
  <p>Area Size: ${element.areaSizeInput} ft</p>
  <p>Has AC ?: ${element.hasAcInput}</p>
  <p>Year Built: ${element.yearsBuiltInput}</p>
  <p>Rent Price: ${element.rentPriceInput} Euro</p>
  <p>Date Available: ${element.dateAvailableInput}</p>
  </div>`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList = "render-buttons";

    const editFlats = document.createElement("button");
    editFlats.textContent = "Edit Flat";
    editFlats.onclick = () => openEdit(element);
    const removeFlatBtn = document.createElement("button");
    removeFlatBtn.textContent = "Dellete";
    removeFlatBtn.addEventListener("click", () => {
      gatherId(element);
      delleteFlats(map, index);
    });

    buttonsDiv.append(removeFlatBtn, editFlats);
    flatDiv.append(buttonsDiv);
    flatContainer.append(flatDiv);
  });
};

const addFlatsFavoriteSecond = () => {
  const noFavMessage = document.getElementById("noFavMessage");
  const loggedInUserRenderFav = readFromLS("loggedInUser") || {};
  console.log(loggedInUserRenderFav);
  const favoritesUserReder =
    loggedInUserRenderFav["usersFavoritesSecond"] || [];
  const map = favoritesUserReder.map((element) => element);
  console.log(map.length);
  if (map.length === 0) {
    noFavMessage.style.display = "flex";
  }
  console.log(map);
  flatContainerFav.innerHTML = "";
  favoritesUserReder.forEach((element, index) => {
    const flatDiv = document.createElement("div");
    flatDiv.classList = "render-flats";
    flatDiv.innerHTML = `<img src="./house-Img.jpg" >
    <div class="render-flats-content"> <p>City: ${element.cityInput}</p>
  <p>Street Name: ${element.streetNameInput}</p>
  <p>Street Number: ${element.streetNumberInput}</p>
  <p>Area Size: ${element.areaSizeInput} ft</p>
  <p>Has AC ?: ${element.hasAcInput}</p>
  <p>Year Built: ${element.yearsBuiltInput}</p>
  <p>Rent Price: ${element.rentPriceInput} Euro</p>
  <p>Date Available: ${element.dateAvailableInput}</p>
  </div>`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList = "render-buttons";
    const removeFlatBtn = document.createElement("button");
    removeFlatBtn.textContent = "Remove Favorite";
    removeFlatBtn.onclick = () => delleteFlatsFavorite(map, index);

    buttonsDiv.append(removeFlatBtn);
    flatDiv.append(buttonsDiv);
    flatContainerFav.append(flatDiv);
  });
};

const openEdit = (element) => {
  editFlatsContainer.style.display = "flex";
  uniqueId.value = element.id;
  cityEdit.value = element.cityInput;
  streetNameEdit.value = element.streetNameInput;
  streetNumberEdit.value = element.streetNumberInput;
  areaSizeEdit.value = element.areaSizeInput;
  hasAcEdit.value = element.hasAcInput;
  yearsBuiltEdit.value = element.yearsBuiltInput;
  rentPriceEdit.value = element.rentPriceInput;
  dateAvailableEdit.value = element.dateAvailableInput;
};

const delleteFlatsFavorite = (array, index) => {
  const readUser = readFromLS("users") || [];
  console.log(array);
  array.splice(index, 1);
  console.log(array);
  const loggedInUserFav = readFromLS("loggedInUser") || [];

  const updateUsersFavorite = {
    ...loggedInUserFav,
    usersFavoritesSecond: array,
  };

  console.log(updateUsersFavorite);

  const indexFav = readUser.findIndex(
    (element) => element.emailInput === loggedInUserFav.emailInput
  );
  readUser[indexFav] = updateUsersFavorite;
  console.log(readUser);
  console.log(loggedInUserFav);
  console.log(updateUsersFavorite);
  writeToLS("loggedInUser", updateUsersFavorite);
  writeToLS("users", readUser);
  addFlatsFavoriteSecond();
};

let takeId = 0;

const gatherId = (element) => {
  takeId = element.id;
  console.log(takeId);
};

const delleteFlats = (array, index) => {
  const readUser = readFromLS("users") || [];
  console.log(array);
  array.splice(index, 1);
  console.log(array);
  const loggedInUserFav = readFromLS("loggedInUser") || [];

  const updateUsersFavorite = {
    ...loggedInUserFav,
    usersFavoritesFirst: array,
  };

  console.log(updateUsersFavorite);

  const indexFav = readUser.findIndex(
    (element) => element.emailInput === loggedInUserFav.emailInput
  );
  readUser[indexFav] = updateUsersFavorite;
  console.log(readUser);
  const flatsReaded = readFromLS("flats") || [];
  const indexEdit = flatsReaded.findIndex((element) => element.id === takeId);
  console.log(indexEdit);
  console.log(flatsReaded);
  flatsReaded.splice(indexEdit, 1);
  console.log(flatsReaded);
  writeToLS("flats", flatsReaded);
  console.log(loggedInUserFav);
  console.log(updateUsersFavorite);
  writeToLS("loggedInUser", updateUsersFavorite);
  writeToLS("users", readUser);
  addFlatsFavorite();
};
const delleteFlatPer = () => {
  console.log(array);
  array.splice(index, 1);
  writeToLS("flats", array);
  addFlats();
};
export { writeToLS, readFromLS, addFlatsFavorite, addFlatsFavoriteSecond };

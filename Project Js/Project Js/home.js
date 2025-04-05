import {
  writeToLS,
  readFromLS,
  addFlatsFavorite,
  addFlatsFavoriteSecond,
} from "./util.js";

const welcome = document.getElementById("welcome");
const allFlats = document.getElementById("allFlats");
const addNewFlat = document.getElementById("addNewFlat");
const editProfile = document.getElementById("editProfile");
const logOut = document.getElementById("logOut");

const flatsAppear = document.getElementById("flatsAppear");
const addFlatBtn = document.getElementById("addFlat");
const errorFlats = document.getElementById("errorFlats");
const flatContainer = document.getElementById("flatContainer");
const noFlatMessage = document.getElementById("noFlatMessage");
const flatContainerFav = document.getElementById("flatContainerFav");
const editFlatsContainer = document.getElementById("editFlatsContainer");

const loggedInUser = readFromLS("loggedInUser") || {};
console.log(loggedInUser);

const ckeckIfUserLoggedIn = (loggedInUser) =>
  loggedInUser === null && window.location.assign("./ladingpage.html");

ckeckIfUserLoggedIn(loggedInUser);

welcome.innerText = `WELCOME ${loggedInUser.userNameInput.toUpperCase()}`;

logOut.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  const loggedInUser = readFromLS("loggedInUser");
  ckeckIfUserLoggedIn(loggedInUser);
});

addNewFlat.addEventListener("click", () => {
  flatsAppear.classList.toggle("show");
});

allFlats.addEventListener("click", () => {
  window.location.href = "./allflatspage.html";
});

editProfile.addEventListener("click", () => {
  window.location.href = "./editprofile.html";
});

const getData = (e) => {
  const randomId = Math.random().toString(36).slice(2).substr(2, 10);
  const city = document.getElementById("city");
  const streetName = document.getElementById("streetName");
  const streetNumber = document.getElementById("streetNumber");
  const areaSize = document.getElementById("areaSize");
  const hasAc = document.getElementById("hasAc");
  const yearsBuilt = document.getElementById("yearsBuilt");
  const rentPrice = document.getElementById("rentPrice");
  const dateAvailable = document.getElementById("dateAvailable");
  console.log(dateAvailable.value);
  const dateRightNow = new Date().getFullYear();
  const flatAvailableDateYear = new Date(dateAvailable.value).getFullYear();
  const flatAvailableDateMonth = new Date(dateAvailable.value).getMonth() + 1;
  const flatAvailableDateDate = new Date(dateAvailable.value).getDate();
  const flatAvailableDateTotal = `${flatAvailableDateDate}-${flatAvailableDateMonth}-${flatAvailableDateYear}`;
  console.log(flatAvailableDateTotal);

  const flats = {
    id: randomId,
    cityInput: city.value,
    streetNameInput: streetName.value,
    streetNumberInput: Number(streetNumber.value),
    areaSizeInput: Number(areaSize.value),
    hasAcInput: hasAc.value,
    yearsBuiltInput: Number(yearsBuilt.value),
    rentPriceInput: Number(rentPrice.value),
    dateAvailableInput: flatAvailableDateTotal,
  };

  const emptyFieldsCheck = !!(
    flats.cityInput === "" ||
    flats.streetNameInput === "" ||
    flats.streetNumberInput === "" ||
    flats.areaSizeInput === "" ||
    flats.hasAcInput === "" ||
    flats.yearsBuiltInput === "" ||
    flats.rentPriceInput === "" ||
    dateAvailable.value === ""
  );

  if (emptyFieldsCheck) {
    errorFlats.innerHTML = " Complet each field";
    return;
  }

  if (streetNumber.value > 10000) {
    errorFlats.innerHTML = "Exteded the maximum street numbers";
    return;
  }

  if (areaSize.value > 5000) {
    errorFlats.innerHTML = "Exteded the maximum area size";
    return;
  }

  if (yearsBuilt.value > dateRightNow || yearsBuilt.value < 1800) {
    errorFlats.innerHTML = "Error not avalable date";
    return;
  }

  if (flatAvailableDateYear > dateRightNow || flatAvailableDateYear < 2000) {
    errorFlats.innerHTML = "We are not even in that year";
    return;
  }

  const flatsAdded = readFromLS("flats") || [];
  flatsAdded.push(flats);
  writeToLS("flats", flatsAdded);
  console.log(flatsAdded);

  const usersList = readFromLS("users") || [];
  console.log(usersList);
  const loggedInUserFav = readFromLS("loggedInUser") || [];
  console.log(loggedInUserFav);
  const favoritesUser = loggedInUserFav.usersFavoritesFirst || [];
  console.log(favoritesUser);
  favoritesUser.push(flats);

  const updateUsersFavorite = {
    ...loggedInUserFav,
    usersFavoritesFirst: favoritesUser,
  };

  console.log(favoritesUser);
  console.log(updateUsersFavorite);

  const indexFav = usersList.findIndex(
    (element) => element.emailInput === loggedInUser.emailInput
  );
  usersList[indexFav] = updateUsersFavorite;
  console.log(usersList);
  console.log(loggedInUserFav);
  console.log(favoritesUser);
  console.log(updateUsersFavorite);
  writeToLS("loggedInUser", updateUsersFavorite);
  writeToLS("users", usersList);

  addFlatsFavorite();

  city.value = "";
  streetName.value = "";
  streetNumber.value = "";
  areaSize.value = "";
  hasAc.value = "";
  yearsBuilt.value = "";
  rentPrice.value = "";
  dateAvailable.value = "";
  flatsAppear.classList.toggle("hide");
  noFlatMessage.style.display = "none";
};

const uniqueId = document.getElementById("uniqueId");
const cityEdit = document.getElementById("cityEdit");
const streetNameEdit = document.getElementById("streetNameEdit");
const streetNumberEdit = document.getElementById("streetNumberEdit");
const areaSizeEdit = document.getElementById("areaSizeEdit");
const hasAcEdit = document.getElementById("hasAcEdit");
const yearsBuiltEdit = document.getElementById("yearsBuiltEdit");
const rentPriceEdit = document.getElementById("rentPriceEdit");
const dateAvailableEdit = document.getElementById("dateAvailableEdit");
const confirmEditFlat = document.getElementById("confirmEditFlat");
const errorEdit = document.getElementById("errorEdit");

const sendEdit = () => {
  const flatsReaded = readFromLS("flats") || [];
  const indexEdit = flatsReaded.findIndex(
    (element) => element.id === uniqueId.value
  );

  const emptyFieldsCheckEdit = !!(
    cityEdit.value === "" ||
    streetNameEdit.value === "" ||
    streetNumberEdit.value === "" ||
    areaSizeEdit.value === "" ||
    hasAcEdit.value === "" ||
    yearsBuiltEdit.value === "" ||
    rentPriceEdit.value === "" ||
    dateAvailableEdit.value === ""
  );

  if (emptyFieldsCheckEdit) {
    return (errorEdit.innerHTML = " complet each field");
  }

  console.log(indexEdit);
  flatsReaded[indexEdit].cityInput = cityEdit.value;
  flatsReaded[indexEdit].streetNameInput = streetNameEdit.value;
  flatsReaded[indexEdit].streetNumberInput = Number(streetNumberEdit.value);
  flatsReaded[indexEdit].areaSizeInput = Number(areaSizeEdit.value);
  flatsReaded[indexEdit].hasAcInput = hasAcEdit.value;
  flatsReaded[indexEdit].yearsBuiltInput = Number(yearsBuiltEdit.value);
  flatsReaded[indexEdit].rentPriceInput = Number(rentPriceEdit.value);
  flatsReaded[indexEdit].dateAvailableInput = `
${new Date(dateAvailableEdit.value).getDate()}-
${new Date(dateAvailableEdit.value).getMonth() + 1}-
${new Date(dateAvailableEdit.value).getFullYear()}`;

  writeToLS("flats", flatsReaded);

  const usersList = readFromLS("users") || [];
  console.log(usersList);
  const loggedInUserFav = readFromLS("loggedInUser") || [];
  console.log(loggedInUserFav);
  const favoritesUser = loggedInUserFav.usersFavoritesFirst || [];
  console.log(favoritesUser);
  const indexEditUserFlat = favoritesUser.findIndex(
    (element) => element.id === uniqueId.value
  );
  favoritesUser[indexEditUserFlat].cityInput = cityEdit.value;
  favoritesUser[indexEditUserFlat].streetNameInput = streetNameEdit.value;
  favoritesUser[indexEditUserFlat].streetNumberInput = Number(
    streetNumberEdit.value
  );
  favoritesUser[indexEditUserFlat].areaSizeInput = Number(areaSizeEdit.value);
  favoritesUser[indexEditUserFlat].hasAcInput = hasAcEdit.value;
  favoritesUser[indexEditUserFlat].yearsBuiltInput = Number(
    yearsBuiltEdit.value
  );
  favoritesUser[indexEditUserFlat].rentPriceInput = Number(rentPriceEdit.value);
  favoritesUser[indexEditUserFlat].dateAvailableInput = `
${new Date(dateAvailableEdit.value).getDate()}-
0${new Date(dateAvailableEdit.value).getMonth() + 1}-
${new Date(dateAvailableEdit.value).getFullYear()}`;

  const updateUsersFavorite = {
    ...loggedInUserFav,
    usersFavoritesFirst: favoritesUser,
  };

  console.log(favoritesUser);
  console.log(updateUsersFavorite);

  const indexFav = usersList.findIndex(
    (element) => element.emailInput === loggedInUser.emailInput
  );
  usersList[indexFav] = updateUsersFavorite;
  console.log(usersList);
  console.log(loggedInUserFav);
  console.log(favoritesUser);
  console.log(updateUsersFavorite);
  writeToLS("loggedInUser", updateUsersFavorite);
  writeToLS("users", usersList);
  addFlatsFavorite();
  editFlatsContainer.style.display = "none";
};

confirmEditFlat.addEventListener("click", (e) => {
  e.preventDefault();
  sendEdit();
});

addFlatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
  addFlatsFavorite();
});

addFlatsFavorite();
addFlatsFavoriteSecond();

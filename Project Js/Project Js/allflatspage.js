import {
  writeToLS,
  readFromLS,
  addFlatsFavorite,
  addFlatsFavoriteSecond,
} from "./util.js";

const welcome = document.getElementById("welcome");
const homePage = document.getElementById("homePage");
const addNewFlat = document.getElementById("addNewFlat");
const editProfile = document.getElementById("editProfile");
const logOut = document.getElementById("logOut");

const flatsAppear = document.getElementById("flatsAppear");
const addFlatBtn = document.getElementById("addFlat");
const errorFlats = document.getElementById("errorFlats");
const flatContainer = document.getElementById("flatContainer");
const flatsFilteredContainer = document.getElementById(
  "flatsFilteredContainer"
);
const noFlatMessage = document.getElementById("noFlatMessage");
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const filtrePrice = document.getElementById("filtrePrice");
const filtreOptionsField = document.getElementById("filtreOptionsField");
const filtreOptionsBtn = document.getElementById("filtreOptionsBtn");
const resetFilteredOptions = document.getElementById("resetFilteredOptions");

const areaMin = document.getElementById("areaMin");
const areaMax = document.getElementById("areaMax");
const areaFiltre = document.getElementById("areaFiltre");

const cityBtn = document.getElementById("cityBtn");
const lowHighBtn = document.getElementById("lowHighBtn");
const sortBtn = document.getElementById("sortBtn");
const highLowBtn = document.getElementById("highLowBtn");
const filtreCategoriField = document.getElementById("filtreCategoriField");

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

homePage.addEventListener("click", () => {
  window.location.href = "./home.html";
});

editProfile.addEventListener("click", () => {
  window.location.href = "./editprofile.html";
});

filtreOptionsBtn.addEventListener("click", () => {
  filtreOptionsField.classList.toggle("show");
});

sortBtn.addEventListener("click", () => {
  filtreCategoriField.classList.toggle("show");
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
    errorFlats.innerHTML = " complet each field";
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
    errorFlats.innerHTML = "we are not even in that year";
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

const addFlats = () => {
  const noFlatMessage = document.getElementById("noFlatMessage");
  const flatsList = readFromLS("flats");
  console.log(flatsList);
  if (flatsList === null) {
    noFlatMessage.style.display = "flex";
  }
  flatContainer.innerHTML = "";
  flatsList.forEach((element, index) => {
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
    removeFlatBtn.textContent = "Favorite";
    removeFlatBtn.onclick = () => fav(element);

    buttonsDiv.append(removeFlatBtn);
    flatDiv.append(buttonsDiv);
    flatContainer.append(flatDiv);
  });
};

const fav = (element) => {
  const usersListSecond = readFromLS("users") || [];
  console.log(usersListSecond);
  const loggedInUserFavSecond = readFromLS("loggedInUser") || [];
  console.log(loggedInUserFavSecond);
  const favoritesUserSecond = loggedInUserFavSecond.usersFavoritesSecond || [];
  console.log(favoritesUserSecond);
  favoritesUserSecond.push(element);

  const updateUsersFavoriteSecond = {
    ...loggedInUserFavSecond,
    usersFavoritesSecond: favoritesUserSecond,
  };

  console.log(favoritesUserSecond);
  console.log(updateUsersFavoriteSecond);

  const indexFavSecond = usersListSecond.findIndex(
    (element) => element.emailInput === loggedInUser.emailInput
  );
  usersListSecond[indexFavSecond] = updateUsersFavoriteSecond;
  console.log(usersListSecond);
  console.log(loggedInUserFavSecond);
  console.log(favoritesUserSecond);
  console.log(updateUsersFavoriteSecond);
  writeToLS("loggedInUser", updateUsersFavoriteSecond);
  writeToLS("users", usersListSecond);
  addFlatsFavoriteSecond();
};

addFlatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
  addFlats();
});

addFlats();

filtrePrice.addEventListener("click", () => {
  const priceLowHigh = readFromLS("flats") || [];

  const priceLowHighFiltre = priceLowHigh.filter((element) => {
    return (
      element.rentPriceInput >= priceMin.value &&
      element.rentPriceInput <= priceMax.value
    );
  });
  console.log(priceLowHighFiltre);
  writeToLS("flatsFilter", priceLowHighFiltre);

  addFlats();
  flatFilter();
});

resetFilteredOptions.addEventListener("click", () => {
  const flatsFiltersplice = readFromLS("flatsFilter") || [];
  flatsFiltersplice.splice(0, flatsFiltersplice.length);
  writeToLS("flatsFilter", flatsFiltersplice);
  addFlats();
  flatFilter();
  priceMin.value = "";
  priceMax.value = "";
});

const flatFilter = () => {
  const editedFlats = readFromLS("flatsFilter") || [];
  if (editedFlats.length === 0) {
    flatContainer.style.display = "grid";
    flatsFilteredContainer.style.display = "none";
  } else {
    flatContainer.style.display = "none";
    flatsFilteredContainer.style.display = "grid";
  }
  flatsFilteredContainer.innerHTML = "";

  editedFlats.forEach((element) => {
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
    removeFlatBtn.textContent = "Favorite";
    removeFlatBtn.onclick = () => fav(element);

    buttonsDiv.append(removeFlatBtn);
    flatDiv.append(buttonsDiv);
    flatsFilteredContainer.append(flatDiv);
  });
};

flatFilter();

areaFiltre.addEventListener("click", () => {
  const areaMinMax = readFromLS("flats") || [];

  const areaMinMaxFiltre = areaMinMax.filter((element) => {
    return (
      element.areaSizeInput >= areaMin.value &&
      element.areaSizeInput <= areaMax.value
    );
  });
  console.log(areaMinMaxFiltre);
  writeToLS("flatsFilter", areaMinMaxFiltre);

  addFlats();
  renderAreaSize();
});

const renderAreaSize = () => {
  const editedArea = readFromLS("flatsFilter") || [];
  if (editedArea.length === 0) {
    flatContainer.style.display = "grid";
    flatsFilteredContainer.style.display = "none";
  } else {
    flatContainer.style.display = "none";
    flatsFilteredContainer.style.display = "grid";
  }
  flatsFilteredContainer.innerHTML = "";

  editedArea.forEach((element) => {
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
    removeFlatBtn.textContent = "Favorite";
    removeFlatBtn.onclick = () => fav(element);

    buttonsDiv.append(removeFlatBtn);
    flatDiv.append(buttonsDiv);
    flatsFilteredContainer.append(flatDiv);
  });
};

renderAreaSize();

lowHighBtn.addEventListener("click", () => {
  const citySortLowHigh = readFromLS("flats") || [];

  citySortLowHigh.sort((a, b) => a.rentPriceInput - b.rentPriceInput);

  console.log(citySortLowHigh);

  writeToLS("flats", citySortLowHigh);

  addFlats();
});

highLowBtn.addEventListener("click", () => {
  const citySortHighLow = readFromLS("flats") || [];

  citySortHighLow.sort((a, b) => b.rentPriceInput - a.rentPriceInput);

  console.log(citySortHighLow);

  writeToLS("flats", citySortHighLow);

  addFlats();
});

cityBtn.addEventListener("click", () => {
  const citySortHighLow = readFromLS("flats") || [];

  citySortHighLow.sort((a, b) => a.cityInput.localeCompare(b.cityInput));

  console.log(citySortHighLow);

  writeToLS("flats", citySortHighLow);

  addFlats();
});

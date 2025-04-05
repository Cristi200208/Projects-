import { writeToLS, readFromLS } from "./util.js";

const userName = document.getElementById("userName");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const age = document.getElementById("age");
let registerBtn = document.getElementById("registerBtn");
const error = document.getElementById("error");

const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};

console.log(loggedInUser);

const ckeckIfUserLoggedIn = (loggedInUser) =>
  Object.values(loggedInUser).length > 0 &&
  window.location.assign("./home.html");

ckeckIfUserLoggedIn(loggedInUser);

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const birthDate = new Date(age.value);
  const curentDate = new Date();
  const calculatedAge = curentDate.getFullYear() - birthDate.getFullYear();

  const userInfo = {
    usersFavoritesFirst: [],
    usersFavoritesSecond: [],
    userNameInput: userName.value,
    emailInput: email.value,
    firstNameInput: firstName.value,
    lastNameInput: lastName.value,
    passwordInput: btoa(password.value),
    ageInput: calculatedAge,
  };

  const isUserNameTaken = users.some(
    (element) => userInfo.userNameInput === element.userNameInput
  );
  const isEmailTaken = users.some(
    (element) => userInfo.emailInput === element.emailInput
  );

  const areFieldsEmpty = !!(
    userInfo.userNameInput === "" ||
    userInfo.emailInput === "" ||
    userInfo.firstNameInput === "" ||
    userInfo.lastNameInput === "" ||
    userInfo.passwordInput === "" ||
    age.value === ""
  );

  if (areFieldsEmpty) {
    error.innerHTML = `Complete each field of the form`;
    return;
  }

  if (!validateEmail(userInfo.emailInput)) {
    error.innerHTML = `Email is not valid`;
    return;
  }

  if (!validatePassword(userInfo.passwordInput)) {
    return;
  }

  if (userInfo.ageInput < 18 || userInfo.ageInput > 120) {
    error.innerHTML = `Age is not valid`;
    return;
  }

  if (isUserNameTaken) {
    error.innerHTML = `User name is taken`;
    return;
  }
  if (isEmailTaken) {
    error.innerHTML = `Email is taken`;
    return;
  }

  console.log(userInfo.passwordInput);
  users.push(userInfo);
  writeToLS("users", users);
  window.location.assign("./home.html");
  const loggedInUser = userInfo;
  writeToLS("loggedInUser", loggedInUser);
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#]/;
  const pass = atob(password);

  if (pass.length < 6) {
    error.innerHTML = "Opps more than 6 caracters";
  } else if (!upperCaseRegex.test(pass)) {
    error.innerHTML = "You need a upper case too";
  } else if (!lowerCaseRegex.test(pass)) {
    error.innerHTML = "You need a lower case too";
  } else if (!numberRegex.test(pass)) {
    error.innerHTML = "You need a numbers too";
  } else if (!specialCharRegex.test(pass)) {
    error.innerHTML = "You need a special case too";
  } else {
    return true;
  }
};

import { writeToLS, readFromLS } from "./util.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const logBtn = document.getElementById("logBtn");
const error = document.getElementById("error");

const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};

console.log(loggedInUser);

const ckeckIfUserLoggedIn = (loggedInUser) =>
  Object.values(loggedInUser).length > 0 &&
  window.location.assign("./home.html");
ckeckIfUserLoggedIn(loggedInUser);

logBtn.addEventListener("click", (e) => {
  e.preventDefault();

  ckeckLogInValid(users);
});

const ckeckLogInValid = (users) => {
  users.forEach((element) => {
    if (email.value === "" && password.value === "") {
      error.innerText = "Enter Something";
    } else if (
      element.emailInput === email.value.trim() &&
      element.passwordInput === btoa(password.value.trim())
    ) {
      window.location.assign("./home.html");
      writeToLS("loggedInUser", element);
    } else {
      error.innerText = "Email or Password are incorrect!";
    }
  });
};

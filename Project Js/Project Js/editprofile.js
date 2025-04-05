import { writeToLS, readFromLS } from "./util.js";

const backToHome = document.getElementById("backToHome");
const userNameEdit = document.getElementById("userNameEdit");
const passwordEdit = document.getElementById("passwordEdit");
let registerBtnEdit = document.getElementById("registerBtnEdit");
const errorEdit = document.getElementById("errorEdit");

backToHome.addEventListener("click", () => {
  window.location.href = "./home.html";
});

const userUpdate = readFromLS("loggedInUser") || [];

console.log(userUpdate);
const openEdit = (element) => {
  userNameEdit.value = element.userNameInput;
  passwordEdit.value = element.passwordInput;
};

openEdit(userUpdate);

const sendEdit = () => {
  const emailEdit = document.getElementById("emailEdit");
  const firstNameEdit = document.getElementById("firstNameEdit");
  const lastNameEdit = document.getElementById("lastNameEdit");
  const ageEdit = document.getElementById("ageEdit");
  const birthDateEdit = new Date(ageEdit.value);
  const curentDateEdit = new Date();
  const calculatedAgeEdit =
    curentDateEdit.getFullYear() - birthDateEdit.getFullYear();
  console.log(calculatedAgeEdit);
  const usersReaded = readFromLS("users") || [];

  const isEmailTaken = usersReaded.some(
    (element) => emailEdit.value === element.emailInput
  );

  if (isEmailTaken) {
    errorEdit.innerHTML = ` Emails is taken`;
    return;
  }

  if (
    birthDateEdit.getFullYear() < curentDateEdit.getFullYear() &&
    birthDateEdit.getFullYear() > curentDateEdit.getFullYear()
  ) {
    errorEdit.innerHTML = "Error enter an valide date";
    return;
  }

  const indexEditUsers = usersReaded.findIndex(
    (element) => element.userNameInput === userNameEdit.value
  );

  console.log(indexEditUsers);

  const areFieldsEmptyEdit = !!(
    emailEdit.value === "" ||
    firstNameEdit.value === "" ||
    lastNameEdit.value === "" ||
    ageEdit.value === ""
  );

  if (areFieldsEmptyEdit) {
    return (errorEdit.innerHTML = "complet each field");
  }

  usersReaded[indexEditUsers].emailInput = emailEdit.value;
  usersReaded[indexEditUsers].firstNameInput = firstNameEdit.value;
  usersReaded[indexEditUsers].lastNameInput = lastNameEdit.value;
  usersReaded[indexEditUsers].ageInput = calculatedAgeEdit;

  writeToLS("users", usersReaded);
  localStorage.removeItem("loggedInUser");
  window.location.href = "./logIn.html";
};

registerBtnEdit.addEventListener("click", (e) => {
  e.preventDefault();
  sendEdit();
});

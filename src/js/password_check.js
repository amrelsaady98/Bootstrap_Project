//constants
const USERS_DATA_KEY = "usersData";
const CURRENT_USER_KEY = "cuurentUser";

//params
let params = new URLSearchParams(location.search);
let userEmail = params.get("email");

// View Elements
let userEamilTxt = document.getElementById("userEmail");
let passwordInput = document.getElementById("passwordInput");
let passwordInputError = document.getElementById("passwordInputError");
let passwordAlert = document.getElementById("passwordAlert");
let continueBtn = document.getElementById("continueBtn");

// console.log("password Alert => " + passwordAlert);

let passwordRegExp = /^.{6,}$/;

let passwordValid = true;

userEamilTxt.innerText = userEmail;

function validateUserInput() {
  passwordValid = passwordRegExp.test(passwordInput.value);
  return passwordValid;
}

function showUserError() {
  if (!passwordValid) {
    passwordInputError.classList.remove(["d-none"]);
    passwordInput.classList.add(["border-danger"]);
  }
}

function isPasswordCorrect(email, password){
  let data = localStorage.getItem(USERS_DATA_KEY);
  let usersData = JSON.parse(data);
  let isUserCorrect = false;
  
  usersData.forEach(element => {

    // console.log(element)
    // console.log(element.user.email, email)
    if(element.user.email == email){
      if(password == element.user.password){
        isUserCorrect = true;
      }
    }
  });
  return isUserCorrect;
}

function loginUser(email){
  let data = localStorage.getItem(USERS_DATA_KEY);
  let usersData = JSON.parse(data);
  let cuurentUser;
  usersData.forEach(element => {

    // console.log(element)
    // console.log(element.user.email, email)
    if(element.user.email == email){
      cuurentUser = element;
    }
  });
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(cuurentUser));
}

continueBtn.addEventListener("click", () => {
  if (validateUserInput()) {
    if(isPasswordCorrect(userEmail, passwordInput.value)){
      loginUser(userEmail);
      // location.replace("../index.html");
      console.log("Correct");
    }else{
      passwordAlert.classList.remove(["d-none"])
    }
  } else {
    showUserError();
  }
});
passwordInput.addEventListener('focus', () => {
  passwordInputError.classList.add(["d-none"]);
  passwordInput.classList.remove(["border-danger"]);
})
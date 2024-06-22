//constants
const USERS_DATA_KEY = "usersData";
const CURRENT_USER_KEY = "cuurentUser";

// View Elements 
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let rePasswordInput = document.getElementById("rePasswordInput");let nameInputError = document.getElementById("nameInputError");
let emailInputError = document.getElementById("emailInputError");
let passwordInputError = document.getElementById("passwordInputError");
let rePasswordInputError = document.getElementById("rePasswordInputError");
let continueBtn = document.getElementById("continueBtn");
let userExistAlert = document.getElementById("userExistAlert");
let inputElemets = document.querySelectorAll("input");

//check Views
// console.log(nameInput, emailInput, passwrodInput, rePasswordInput, nameInputError, emailInputError, passwrodInputError, rePasswordInputError, continueBtn);

//regular expressions 
let nameRegExp = /^([a-zA-Z0-9_-\s]{2,} [a-zA-Z0-9_-\s]{2,})$/;
let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRegExp = /^01\d{9}$/;
let passwordRegExp = /^.{6,}$/;
// let passwordRegExp = /^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z]).{8,}$/;

//validation flags
let nameValid = true;
let emailValid = true;
let passwordValid = true;
let rePasswordValid = true;



inputElemets.forEach(element => {
  element.addEventListener('focus', ()=>{
    element.classList.remove(["border-danger"]);
    document.getElementById(element.id+"Error").classList.add(["d-none"]);
  })
});

function validateUserInput(){
  nameValid = nameRegExp.test(nameInput.value);
  emailValid = emailRegExp.test(emailInput.value) || phoneRegExp.test(emailInput.value);
  passwordValid = passwordRegExp.test(passwordInput.value);
  rePasswordValid = passwordInput.value === rePasswordInput.value; 
  return nameValid && emailValid && passwordValid && rePasswordValid;
}

function showUserError(){
  if(!nameValid){
    nameInputError.classList.remove(["d-none"]);
    nameInput.classList.add(["border-danger"]);
  }
  if(!emailValid){
    emailInputError.classList.remove(["d-none"]);
    emailInput.classList.add(["border-danger"]);
  }
  if(!passwordValid){
    passwordInputError.classList.remove(["d-none"]);
    passwordInput.classList.add(["border-danger"]);
  }
  if(!rePasswordValid){
    rePasswordInputError.classList.remove(["d-none"]);
    rePasswordInput.classList.add(["border-danger"]);
  }
  
}

function registerUser(){
  let data = localStorage.getItem(USERS_DATA_KEY);
  let usersData = JSON.parse(data);
  let gusetCart;
  if(JSON.parse(sessionStorage.getItem("gusetUser"))){
    gusetCart = JSON.parse(sessionStorage.getItem("gusetUser")).cart;
  }
  sessionStorage.setItem("gusetUser", null)
  // console.log(usersData);

  let userObject = {
    "cart": gusetCart,
    "user":{
      "name": nameInput.value,
      "email": emailInput.value,
      "password": passwordInput.value,
    },
  }

  if(usersData == null){
    usersData = [];
  }

  usersData.push(userObject);
  localStorage.setItem(USERS_DATA_KEY, JSON.stringify(usersData));

  //check data
  // console.log(typeof userObject);
  // console.log(userObject);
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

function isUserExist(email){
  let data = localStorage.getItem(USERS_DATA_KEY);
  let usersData = JSON.parse(data);
  let isUserExist = false;
  
  if(usersData == null || usersData == []){
    console.log("there is no users in db");
    return false;
  }

  usersData.forEach(element => {

    // console.log(element)
    // console.log(element.user.email, email)
    if(element.user.email == email){
      isUserExist = true;
    }
  });
  
  return isUserExist;
}


continueBtn.addEventListener("click", ()=>{
  if(validateUserInput()){
    if(isUserExist(emailInput.value)){
      userExistAlert.classList.remove(["d-none"])
      console.log("user Exist");
    }else {
      registerUser();
      loginUser(emailInput.value)
      location.replace("../index.html")
    }
  } else{
    showUserError();
  }
  //validation test
  // console.log(nameValid, emailValid, passwordValid, rePasswordValid);
})
 

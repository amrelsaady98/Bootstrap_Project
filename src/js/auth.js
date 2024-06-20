//constants
const USERS_DATA_KEY = "usersData";

// View Elements 
let emailInput = document.getElementById("emailInput");
let emailInputError = document.getElementById("emailInputError");
let continueBtn = document.getElementById("continueBtn");
let userNotFoundAlert = document.getElementById("userNotFoundAlert");

let emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRegExp = /^01\d{9}$/;

let emailValid = true;

function validateUserInput(){
  emailValid = emailRegExp.test(emailInput.value) || phoneRegExp.test(emailInput.value);

  return emailValid;
}

function showUserError(){
  if(!emailValid){
    emailInputError.classList.remove(["d-none"]);
    emailInput.classList.add(["border-danger"]);
  }
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

    console.log(element)
    console.log(element.user.email, email)
    if(element.user.email == email){
      isUserExist = true;
    }
  });
  
  return isUserExist;
}

continueBtn.addEventListener("click", ()=>{
  if(validateUserInput()){
    if(isUserExist(emailInput.value)){
      location.assign("password-page.html?email="+emailInput.value);
    }else{
      userNotFoundAlert.classList.remove(["d-none"]);
    }
  }else{
    showUserError();
  }
});

emailInput.addEventListener("focus", ()=>{
  emailInputError.classList.add(["d-none"]);
    emailInput.classList.remove(["border-danger"]);
})


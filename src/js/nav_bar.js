//constants
const USERS_DATA_KEY = "usersData";
const CURRENT_USER_KEY = "cuurentUser";
const GUSSET_USER_KEY = "gusetUser";

// console.log('hello from product.html')
let categoriesLinksContainer_nav = document.querySelector('#nav-bottom-left');
// let categoriesCardsContainer = document.querySelector('.categoriesCardsContainer');

function loadCategoriesLinks(){
  const url = new URL(
    "https://api.chec.io/v1/categories"
  );

  const headers = {
    "X-Authorization": "pk_test_575252ab98849f8e814a1a05c7e4264057f88e13c86e4",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(response => response.json())
    .then((response) => {addCategoriesLinks(response.data);
      return response})
    .then((response) => {
      console.log(response.data)
    })
    // .catch(error => console.log('Error:', error));
}

function addCategoriesLinks(categories=[]){
  let router = ""; 
  if(location.pathname == "/src/index.html"){
    router = "pages/";
  }
  for (let i = categories.length - 1; i >= 0; i--) {
    
    let newCategory = document.createElement('a');
    newCategory.classList.add('nav-a');
    newCategory.innerText = categories[i].name;
    newCategory.setAttribute("href", router + "products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    categoriesLinksContainer_nav.append(newCategory);
  }

}

checkLoginState();
loadCategoriesLinks();

// search feature
let searchBtn_nav = document.getElementById('nav-search-right');
let searchInput_nav = document.getElementById('nav-search-input');

searchBtn_nav.addEventListener('click', function(){
  window.location .assign(`../pages/products.html?q=${searchInput_nav.value}`);
});
searchInput_nav.addEventListener("keypress",
  (eventHandler) => {
    if (eventHandler.key === "Enter") {
      window.location.assign(`../pages/products.html?q=${searchInput_nav.value}`);
    }
  });

//login feature
function checkLoginState(){
  console.log("check user state ")
  let signInContainer_nav = document.getElementById("sign-in-container");
  let titleNavSignInContainer = document.getElementById("titleNavSignInContainer");
  let cartCountElement = document.querySelectorAll("#cart-container span");

  let cartCounter = 0;
  if(sessionStorage.hasOwnProperty(CURRENT_USER_KEY)){
    
    
    titleNavSignInContainer.innerHTML = `
      <span>Hello, ${JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)).user.name}</span>
      
    `;
    signInContainer_nav.innerHTML = `
      <span>Hello, ${JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)).user.name} <br/></span>
      <span>Account and Lists</span>
    `;
    signInContainer_nav.parentNode.setAttribute("href", "#");
    titleNavSignInContainer.parentNode.setAttribute("href", "#");
    
    if(JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)).cart != null){
      cartCounter = JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY)).cart.length;
    }
    

  }else {
    
    if(JSON.parse(sessionStorage.getItem(GUSSET_USER_KEY))){
      if(JSON.parse(sessionStorage.getItem(GUSSET_USER_KEY)).cart){
        cartCounter = JSON.parse(sessionStorage.getItem(GUSSET_USER_KEY)).cart.length;
      }
    }
  }
  cartCountElement.forEach((item)=>item.innerText = cartCounter);
}

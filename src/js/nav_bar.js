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
    .then((response) => {addCategories(response.data);
      return response})
    .then((response) => {
      console.log(response.data)
    })
    .catch(error => console.log('Error:', error));
}

function addCategories(categories=[]){
  for (let i = categories.length - 1; i >= 0; i--) {
    let newCategory = document.createElement('a');
    newCategory.classList.add('nav-a');
    newCategory.innerText = categories[i].name;
    newCategory.setAttribute("href", "products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    categoriesLinksContainer_nav.append(newCategory);

    /*let newCategoryCard = document.createElement('div');
    let newCategoryCardImage = document.createElement('img');
    let newCategoryCardText = document.createElement('span');
    let newCategoryCardShowMore = document.createElement('span');

    newCategoryCard.classList.add('categoryCard');
    newCategoryCardImage.setAttribute('src', categories[i].image);
    newCategoryCardText.innerText = categories[i].name;
    newCategoryCardShowMore.innerText = "See more";

    newCategoryCard.append(newCategoryCardText, newCategoryCardImage, newCategoryCardShowMore);
    newCategoryCard.addEventListener('click', ()=>{
      window.location.assign( "./pages/products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    })

    categoriesCardsContainer.append(newCategoryCard);*/

  }

}

loadCategoriesLinks();
checkLoginState();

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
  let signInContainer_nav = document.getElementById("sign-in-container");
  if(sessionStorage.hasOwnProperty("currentUser")){
    console.log(JSON.parse(sessionStorage.getItem("currentUser")).name);
    console.log(signInContainer_nav.firstChild);
    signInContainer_nav.innerHTML = `

      <span>Hello, ${JSON.parse(sessionStorage.getItem("currentUser")).name} <br/></span>
      <span>Account and Lists</span>
    `;
  }else {
    console.log("localStorage ---");
  }
}

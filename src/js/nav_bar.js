// console.log('hello from product.html')
let categoriesLinksContainer_nav = document.querySelector('#nav-bottom-left');
// let categoriesCardsContainer = document.querySelector('.categoriesCardsContainer');

function loadCategoriesLinks(){
  fetch('https://api.escuelajs.co/api/v1/categories')
    .then(response => response.json())
    .then((data)=>addCategories(data))
    .catch(error => console.log('Error:', error));
}

function addCategories(categories=[]){
  for (let i = 0; i < 10; i++) {
    let newCategory = document.createElement('a');
    // console.log(categories[i])
    newCategory.classList.add('nav-a');
    newCategory.innerText = categories[i].name;
    newCategory.setAttribute("href", "../pages/products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
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

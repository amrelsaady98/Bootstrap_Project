let urlParams = new URLSearchParams(window.location.search);
let categoryName, categoryId, searchQuery, productsParams;

// document elements
let productsTitle = document.querySelector(".titleContainer span:first-child"); // category or search query
let productsSubTitle = document.querySelector(".titleContainer span:last-child"); // items count
let productsGrid = document.querySelector("#products-grid");
let searchBtn = document.getElementById('nav-search-right');
let searchInput = document.getElementById('nav-search-input');

let categoryList = new Set();
let selectedCategoryList = new Set();
let maxPrice = 0;
let minPrice = 9999999999;

searchBtn.addEventListener('click', function () {
  window.location.assign(`products.html?q=${searchInput.value}`);
});
searchInput.addEventListener("keypress",
  (eventHandler) => {
    if (eventHandler.key === "Enter") {
      window.location.assign(`products.html?q=${searchInput.value}`);
    }
  });

console.log(urlParams.get('q'));
console.log(urlParams.get('categoryName'));
console.log(urlParams.get('categoryId'));

if (urlParams.has("q")) {
  searchQuery = urlParams.get("q");
  //TODO: load search results
  searchInput.value = searchQuery;
  productsTitle.innerText = "Results for \"" + searchQuery + "\"";
  productsParams = "title=" + searchQuery;

}
if (urlParams.has("categoryName")) {
  categoryName = urlParams.get("categoryName");
  categoryId = urlParams.get("categoryId");
  //TODO: update title with category name
  productsTitle.innerText = categoryName;
  //TODO: load category's products
  productsParams = "categoryId=" + categoryId;

}

loadCategoryProducts(productsParams, displayProducts, (err) => console.log("error --> " + err)).then(
  ()=>{
    console.log("then...");
    console.log(categoryList);
    console.log(minPrice);
    console.log(maxPrice);
  }
)


async function loadCategoryProducts(params, resolve, rejected) {
  console.log(`https://api.escuelajs.co/api/v1/products/?${params}`);
  await fetch(`https://api.escuelajs.co/api/v1/products/?${params}`)
    .then(response => response.json())
    .then((data) => resolve(data))
    .catch(error => rejected(error));
}

function displayProducts(data) {
  productsSubTitle.innerText = `${data.length} - Products available`;

  data.map((item) => {
    if(item.price > maxPrice){
      maxPrice = item.price;
    }
    if (item.price < minPrice){
      minPrice = item.price;
    }
    categoryList.add(item.category.name);
    let productCard = document.createElement('div');
    productCard.classList.add("product-card");

    let productImageElement = document.createElement("img");
    productImageElement.classList.add("product-img");
    productImageElement.setAttribute("src", item.images[0]);
    productCard.append(productImageElement);

    let productContentContainer = document.createElement("div");
    productContentContainer.classList.add("product-card-content");

    let productDescription = document.createElement("span");
    productDescription.classList.add("product-card-description");
    productDescription.innerText = item.title;
    productContentContainer.append(productDescription);

    let productPrice = document.createElement("span");
    productPrice.classList.add("product-card-price");
    productPrice.innerText = item.price + " EGP";
    productContentContainer.append(productPrice);

    let addToCardBtn = document.createElement("div");
    addToCardBtn.innerText = "Add to cart";
    addToCardBtn.classList.add("add-to-cart-button");
    addToCardBtn.classList.add("hover-mask");
    addToCardBtn.addEventListener("click", () => {
      addToCart(item);
      // console.log(item);
    })
    productContentContainer.append(addToCardBtn);

    productCard.append(productContentContainer);
    productCard.style.cursor = "pointer";

    productImageElement.addEventListener('click', () => {
      location.assign("../pages/product.html?productId=" + item.id);
    })
    //TODO : create addToCard(item) function

    // function takes item --> to add to local storage
    productsGrid.append(productCard);
  })
}

// TODO: load Filters parameters
/**
 * =>
 * */

// Pagination

const element = document.querySelector(".pagination ul");
let totalPages = 4;
let firstPageIndex = 1;


element.innerHTML = createPagination(totalPages, firstPageIndex);
function createPagination(totalPages, toPage){
  
  let liTag = '';
  let active;
  let beforePage = toPage - 1;
  let afterPage = toPage + 1;
  if(toPage > 1){ 
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${toPage - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if(toPage > 2 && totalPages >=5){ 
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(toPage > 3){ 
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }


  if (toPage == totalPages) {
    beforePage = beforePage - 2;
  } else if (toPage == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (toPage == 1) {
    afterPage = afterPage + 2;
  } else if (toPage == 2) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { 
      continue;
    }
    if (plength == 0) { 
      plength = plength + 1;
    }
    if(toPage == plength){ 
      active = "active";
    }else{ 
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if(toPage < totalPages - 1 && totalPages >= 5){ 
    if(toPage < totalPages - 2){ 
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (toPage < totalPages) {
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${toPage + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; 
  pageChangedCallBack(toPage);
  return liTag; 
}
function pageChangedCallBack(toPage){
  console.log(toPage);
}

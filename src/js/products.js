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

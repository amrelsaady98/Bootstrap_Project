let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");
let productItem;
console.log(productId);

// View Elements 
let sidePicturesContainer = document.getElementById("sidePicturesContainer");
let mainPicture = document.getElementById("pic");
let producTitle = document.getElementById("producTitle");
let productCategory = document.getElementById("productCategory");
let productPrice = document.getElementById("productPrice");
let productDetails = document.getElementById("productDetails");
let addToCartBtn = document.getElementById("addToCartBtn");
let cartItemQuantityInput = document.getElementById("cartItemQuantityInput");
let cartItemQuantityIncrease = document.getElementById("cartItemQuantityIncrease");
let cartItemQuantityDecrease = document.getElementById("cartItemQuantityDecrease");



function fetchProductData(productId, resolve, reject) {
  const url = new URL(
    "https://api.chec.io/v1/products/" + productId
  );

  const params = {
    "type": "id",
  };
  Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

  const headers = {
    "X-Authorization": "pk_test_575252ab98849f8e814a1a05c7e4264057f88e13c86e4",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "GET",
    headers: headers,
  }).then(response => response.json())
    .then(response=>{
      productItem = response;
      return response;
    })
    .then(response => resolve(response))
  .catch(error => reject(error));
}

function displayProductDetails(response) {
  for (let i = 0; i < response.assets.length; i++) {
    let img = document.createElement("img")
    img.setAttribute("src", response.assets[i].url)
    img.addEventListener("click", () => changeImage(i))
    img.classList.add("pic")
    sidePicturesContainer.append(img)
  }
  //refresh picList 
  picList = document.querySelectorAll(".pic");
  changeImage(0);

  producTitle.innerText = response.name;
  productCategory.innerText = response.categories[0].name;
  
  productCategory.addEventListener('click', ()=>{
    console.log("products.html?categoryId=" + response.categories[0].id + "&categoryName=" + response.categories[0].name)
    location.assign("products.html?categoryId=" + response.categories[0].id + "&categoryName=" + response.categories[0].name)
  })
  let price = response.price.formatted;
  price = price.replace(".00","")
  productPrice.innerText = price;
  productDetails.innerHTML = response.description
  console.log(picList);
}

fetchProductData(productId, displayProductDetails, (error) => console.log(error));


console.log(cartItemQuantityIncrease)
cartItemQuantityIncrease.addEventListener("click", ()=>{
  cartItemQuantityInput.value = Number.parseInt(cartItemQuantityInput.value) + 1
})
cartItemQuantityDecrease.addEventListener("click", ()=>{
  if(Number.parseInt(cartItemQuantityInput.value) > 1){
    cartItemQuantityInput.value = Number.parseInt(cartItemQuantityInput.value) - 1
  }
  
})
addToCartBtn.addEventListener("click", ()=>{
  addToCart(productItem, Number.parseInt(cartItemQuantityInput.value));
  cartItemQuantityInput.value = 1;
  checkLoginState();
})

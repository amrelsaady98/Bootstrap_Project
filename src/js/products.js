let urlParams = new URLSearchParams(window.location.search);
let categoryName, categoryId, searchQuery, productsParams;

console.log(urlParams.values());

// document elements
let productsTitle = document.querySelector("#titleContainer span:first-child"); // category or search query
let productsSubTitle = document.querySelector("#titleContainer span:last-child"); // items count

console.log(productsTitle, productsSubTitle);

let productsGrid = document.querySelector("#productsContainer");
let searchBtn = document.getElementById('nav-search-right');
let searchInput = document.getElementById('nav-search-input');

let categoryList = new Set();
let selectedCategoryList = new Set();
let maxPrice = 0;
let minPrice = 9999999999;

//pagination 
let totalPages = 4;
let firstPageIndex = 1;

console.log(urlParams.get('q'));
console.log(urlParams.get('categoryName'));
console.log(urlParams.get('categoryId'));

if (urlParams.has("q")) {
  searchQuery = urlParams.get("q");
  //TODO: load search results
  searchInput.value = searchQuery;
  productsTitle.innerText = "Results for \"" + searchQuery + "\"";
  productsParams = "query=" + searchQuery;
  productsParams = { "query": searchQuery };

}
if (urlParams.has("categoryName")) {
  console.log("has categories");
  categoryName = urlParams.get("categoryName");
  categoryId = urlParams.get("categoryId");
  //TODO: update title with category name
  productsTitle.innerText = categoryName;
  //TODO: load category's products
  productsParams = "category_id" + categoryId;
  productsParams = { "category_id": categoryId };
}

loadCategoryProducts(productsParams, displayProducts, (err) => console.log("error --> " + err)
)


async function loadCategoryProducts(reqParams, resolve, rejected) {

  const url = new URL(
    "https://api.chec.io/v1/products?" 
  );
  console.log(url);

  const params = {
    "limit": "4",
  };
  Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));
  Object.keys(reqParams)
    .forEach(key => url.searchParams.append(key, reqParams[key]));
    console.log(url.href)

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
    .then(response => {
      totalPages = response.meta.pagination.total_pages;
      console.log(totalPages, response.meta.pagination.current_page, response);

      createPagination(totalPages, response.meta.pagination.current_page);
      if (response.data == undefined) {
        resolve([]);
      } else {
        resolve(response.data)
      }

    })

}

function displayProducts(data) {
  data == undefined ? data = [] : null;
  console.log(data)
  productsSubTitle.innerText = `${data.length} - Products available`;

  data.map((item) => {
    if (item.price.raw > maxPrice) {
      maxPrice = item.price;
    }
    if (item.price.raw < minPrice) {
      minPrice = item.price;
    }
    item.categories.map((categoryItem) => {
      categoryList.add(categoryItem);
    })

    let productCardContainer = document.createElement("div");
    productCardContainer.classList.add("col");

    let productCard = document.createElement('div');
    productCard.classList.add("product-card");

    let productImageElement = document.createElement("img");
    productImageElement.classList.add("product-img");
    productImageElement.setAttribute("src", item.image.url);
    productCard.append(productImageElement);

    let productContentContainer = document.createElement("div");
    productContentContainer.classList.add("product-card-content");

    let productDescription = document.createElement("span");
    productDescription.classList.add("product-card-description");
    productDescription.innerText = item.name;
    productContentContainer.append(productDescription);

    let productPrice = document.createElement("span");
    productPrice.classList.add("product-card-price");
    productPrice.innerText = item.price.formatted_with_code;
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
    productCardContainer.append(productCard);
    productCard.style.cursor = "pointer";

    productDescription.addEventListener('click', () => {
      location.assign("product_details.html?productId=" + item.id);
    })
    //TODO : create addToCard(item) function


    // function takes item --> to add to local storage
    productsGrid.append(productCardContainer);
  })
}

// TODO: load Filters parameters
/**
 * =>
 * */

// Pagination

const element = document.querySelector(".pagination ul");



element.innerHTML = createPagination(totalPages, firstPageIndex);
function createPagination(totalPages, toPage) {

  // pageChangedCallBack(toPage);

  let liTag = '';
  let active;
  let beforePage = toPage - 1;
  let afterPage = toPage + 1;
  if (toPage > 1 && totalPages > 1) {
    liTag += `<li class="btn prev" onclick="pageChangedCallBack(${toPage - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (toPage > 2 && totalPages >= 5 && totalPages > 1) {
    liTag += `<li class="first numb" onclick="pageChangedCallBack( 1)"><span>1</span></li>`;
    if (toPage > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }


  if (toPage == totalPages && toPage > 2) {
    beforePage = beforePage - 2;
  } else if (toPage == totalPages - 1 && toPage > 2) {
    beforePage = beforePage - 1;
  }

  if (toPage == 1) {
    afterPage = afterPage + 2;
  } else if (toPage == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (toPage == plength) {
      active = "active";
    } else {
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="pageChangedCallBack(${plength})"><span>${plength}</span></li>`;
  }

  if (toPage < totalPages - 1 && totalPages >= 5) {
    if (toPage < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="pageChangedCallBack(${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (toPage < totalPages) {
    liTag += `<li class="btn next" onclick="pageChangedCallBack(${toPage + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag;
  // pageChangedCallBack(toPage);
  return liTag;
}
function pageChangedCallBack(toPage) {
  reqParams = {
    "page": toPage
  }
  if(categoryId != undefined){
    reqParams["category_id"] = categoryId;
  }
  if(searchQuery!=null){
    reqParams["query"] = searchQuery;
  }
  while (productsGrid.firstChild) {
    productsGrid.removeChild(productsGrid.lastChild);
  }
  loadCategoryProducts(reqParams, displayProducts);
}

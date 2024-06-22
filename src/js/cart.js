// //constants
// const USERS_DATA_KEY = "usersData";
// const CURRENT_USER_KEY = "cuurentUser";
// const GUSSET_USER_KEY = "gusetUser";

let shopingCartView = document.getElementById("shopingCartView");
let empityCartView = document.getElementById("empityCartView");
let cartHeader = document.getElementById("cartHeader");
let cartItemPrice = document.getElementById("cartItemPrice")
let produceToByContainer = document.getElementById("produceToByContainer");


let userCartItems;
let emptyCart = true;
let totlaPrice = 0;
function loadUserCart() {
  emptyCart = true;
  if (sessionStorage.getItem(CURRENT_USER_KEY)) {
    // registered user
    console.log("// registered user");
    let userData = JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
    if (userData.cart) {
      if (userData.cart.length > 0) {
        emptyCart = false;
      }
      userCartItems = userData.cart;
    }
  } else {
    // guset user
    if (sessionStorage.getItem(GUSSET_USER_KEY)) {
      console.log("gusset Exist")
      if (JSON.parse(sessionStorage.getItem(GUSSET_USER_KEY)).cart) {
        userCartItems = JSON.parse(sessionStorage.getItem(GUSSET_USER_KEY)).cart;
        if (userCartItems.length > 0) {
          emptyCart = false;
        }

      }
    }
  }

  console.log(userCartItems, emptyCart)
}

function displayUserCartItems() {
  totlaPrice = 0;
  while (shopingCartView.firstChild) {
    shopingCartView.removeChild(shopingCartView.lastChild);
  }
  if (emptyCart) {
    empityCartView.classList.remove("d-none");
    cartHeader.classList.add("d-none");
    produceToByContainer.classList.add("d-none")
  } else {
    empityCartView.classList.add("d-none");
    cartHeader.classList.remove("d-none");
    produceToByContainer.classList.remove("d-none")
    for (let i = 0; i < userCartItems.length; i++) {

      createCartElement(userCartItems[i]);
      totlaPrice += userCartItems[i].item.price.raw * userCartItems[i].quntity;
    }
    cartItemPrice.innerText = "Subtotal (" + userCartItems.length + " item): EGP " + totlaPrice + ".00"
  }

}

function createCartElement(cartItemData) {
  let cartItem = document.createElement('div');
  cartItem.classList.add('cartItem', 'row');

  // Create the image element
  let img = document.createElement('img');
  img.classList.add('col-6', 'col-md-3', 'cartItemImg');
  img.src = cartItemData.item.image.url;
  img.alt = ''; // Set alt attribute if needed

  // Create the div for the content (description and other details)
  let contentDiv = document.createElement('div');
  contentDiv.classList.add('col-6', 'col-md-9');

  // Create the cartItemHeader div
  let cartItemHeader = document.createElement('div');
  cartItemHeader.classList.add('cartItemHeader');

  // Create and append the cartItemTitle paragraph
  let cartItemTitle = document.createElement('p');
  cartItemTitle.classList.add('cartItemTitle');
  cartItemTitle.textContent = cartItemData.item.name;
  cartItemTitle.addEventListener("click", () => {
    location.assign("product_details.html?productId=" + cartItemData.item.id);
  })
  cartItemHeader.appendChild(cartItemTitle);

  // Create and append the cartItemPrice paragraph
  let cartItemPrice = document.createElement('p');
  cartItemPrice.classList.add('cartItemPrice');
  cartItemPrice.textContent = cartItemData.item.price.formatted;
  cartItemHeader.appendChild(cartItemPrice);

  // Append cartItemHeader to contentDiv
  contentDiv.appendChild(cartItemHeader);

  // Create and append the paragraphs for "In stock" and "Eligible for FREE delivery"
  let inStockPara = document.createElement('p');
  inStockPara.textContent = 'In stock';
  contentDiv.appendChild(inStockPara);

  let freeDeliveryPara = document.createElement('p');
  freeDeliveryPara.textContent = 'Eligible for FREE delivery';
  contentDiv.appendChild(freeDeliveryPara);

  // Create the cartItemQuantityContainer div
  let cartItemQuantityContainer = document.createElement('div');
  cartItemQuantityContainer.classList.add('cartItemQuantityContainer');

  // Create the cartItemQuantityIncrease div with icon
  let cartItemQuantityIncrease = document.createElement('div');
  cartItemQuantityIncrease.classList.add('cartItemQuantityIncrease', 'hover-mask');
  let plusIcon = document.createElement('i');
  plusIcon.classList.add('fa-solid', 'fa-plus');
  cartItemQuantityIncrease.appendChild(plusIcon);
  cartItemQuantityIncrease.addEventListener("click", () => {
    addToCart(cartItemData.item, 1);
    loadUserCart();
    displayUserCartItems();
    checkLoginState();
  })
  cartItemQuantityContainer.appendChild(cartItemQuantityIncrease);

  // Create the input element for quantity
  let quantityInput = document.createElement('input');
  quantityInput.setAttribute('type', 'number');
  quantityInput.value = cartItemData.quntity;

  cartItemQuantityContainer.appendChild(quantityInput);

  // Create the cartItemQuantityDecrease div with icon
  let cartItemQuantityDecrease = document.createElement('div');
  cartItemQuantityDecrease.classList.add('cartItemQuantityDecrease', 'hover-mask');
  let minusIcon = document.createElement('i');
  minusIcon.classList.add('fa-solid', 'fa-minus');
  cartItemQuantityDecrease.appendChild(minusIcon);
  cartItemQuantityDecrease.addEventListener("click", () => {
    if (cartItemData.quntity > 1) {
      addToCart(cartItemData.item, -1);
    } else {
      deleteCartItem(cartItemData.item.id);
    }
    loadUserCart();
    displayUserCartItems();
    checkLoginState();
  })
  cartItemQuantityContainer.appendChild(cartItemQuantityDecrease);


  // Create separator span
  let separatorSpan = document.createElement('span');
  separatorSpan.textContent = '|';
  cartItemQuantityContainer.appendChild(separatorSpan);

  // Create the Delete span
  let deleteSpan = document.createElement('span');
  deleteSpan.classList.add('cartItemDelete', 'linkText');
  deleteSpan.textContent = 'Delete';
  deleteSpan.addEventListener("click", () => {
    deleteCartItem(cartItemData.item.id);
    loadUserCart();
    displayUserCartItems();
    checkLoginState();
  })
  cartItemQuantityContainer.appendChild(deleteSpan);

  // Append contentDiv to cartItem
  cartItem.appendChild(img);
  cartItem.appendChild(contentDiv);
  contentDiv.appendChild(cartItemQuantityContainer);

  let divider = document.createElement('hr');

  // Append cartItem to the document body or another desired container
  shopingCartView.append(cartItem);
  shopingCartView.append(divider);
}


loadUserCart();
displayUserCartItems();

{/* <div class="cartItem row">
  <img class="col-6 col-md-3 cartItemImg" src="../img/product-img.jpg" alt="" srcset="">
  <div class="col-6 col-md-9">
    <div class="cartItemHeader">
      <p class="cartItemTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium recusandae
        ducimus pariatu</p>
      <p class="cartItemPrice">EPG 3.500,00</p>
    </div>
    <p>In stok</p>
    <p>Eligible for FREE delivery</p>
    <div class="cartItemQuantityContainer">
      <div class="cartItemQuantityIncrease hover-mask">
        <i class="fa-solid fa-plus"></i>
      </div>
      <input type="number" />
      <div class="cartItemQuantityDecrease hover-mask">
        <i class="fa-solid fa-minus"></i>
      </div>
      <span>|</span> <span class="cartItemDelete linkText">Delete</span>
    </div>
  </div>
</div> */}



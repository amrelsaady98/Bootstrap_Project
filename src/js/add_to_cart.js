/**
 * cartItem{
 *  quantity: number,
 *  productItem: Object,
 * }
 */

//constants
const _USERS_DATA_KEY = "usersData";
const _CURRENT_USER_KEY = "cuurentUser";
const _GUSSET_USER_KEY = "gusetUser";

function addToCart(productItem, quntity) {

  let currentUser = JSON.parse(
    sessionStorage.getItem(_CURRENT_USER_KEY)
  );
  
  // check current user => registered | guest
  if (currentUser) {
    if (currentUser.cart == undefined || currentUser.cart == null) {
      currentUser.cart =
        [{
          "item": productItem,
          "quntity": quntity
        }];

    } else {
      let itemExist = false;
      currentUser.cart.map((item) => {
        if (item.item.id == productItem.id) {
          item.quntity += quntity;
          itemExist = true;
        }
      });
      if (!itemExist) {
        currentUser.cart.push(
          {
            "item": productItem,
            "quntity": quntity
          }
        );
      }
    }
    sessionStorage.setItem(_CURRENT_USER_KEY, JSON.stringify(currentUser));

    let usersData = JSON.parse(localStorage.getItem(USERS_DATA_KEY));
    for(let i = 0; i < usersData.length; i++){
      if(usersData[i].email == currentUser.email){
        usersData[i] = currentUser;
      }
    }

    localStorage.setItem(USERS_DATA_KEY, JSON.stringify(usersData));

  } else {
    console.log("No Loged in user");
    let gusetUser = JSON.parse(sessionStorage.getItem(_GUSSET_USER_KEY));
    console.log(gusetUser)
    if (gusetUser == undefined || gusetUser == null) {
      console.log(gusetUser)
      gusetUser = {};
      gusetUser.cart =
        [{
          "item": productItem,
          "quntity": quntity
        }];
    } else {
      let itemExist = false;
      gusetUser.cart.map((item) => {
        if (item.item.id == productItem.id) {
          item.quntity += quntity;
          itemExist = true;
        }
      });
      if (!itemExist) {
        gusetUser.cart.push(
          {
            "item": productItem,
            "quntity": quntity
          }
        );
      }
    }
    sessionStorage.setItem(_GUSSET_USER_KEY, JSON.stringify(gusetUser));
    // location.reload();
  }
}

function deleteCartItem(productItemId){
  let currentUser = JSON.parse(
    sessionStorage.getItem(_CURRENT_USER_KEY)
  );
  
  // check current user => registered | guest
  if (currentUser) {
    userCart = currentUser.cart
    for(let i = 0; i < userCart.length; i++){
      console.log();
      if(userCart[i].item.id == productItemId){
        userCart.splice(i, 1);
      }
    }
    currentUser.cart = userCart;
    sessionStorage.setItem(_CURRENT_USER_KEY, JSON.stringify(currentUser));

    let usersData = JSON.parse(localStorage.getItem(USERS_DATA_KEY));
    for(let i = 0; i < usersData.length; i++){
      if(usersData[i].email == currentUser.email){
        usersData[i] = currentUser;
      }
    }

    localStorage.setItem(USERS_DATA_KEY, JSON.stringify(usersData));

  } else {
    console.log("No Loged in user");
    let gusetUser = JSON.parse(sessionStorage.getItem(_GUSSET_USER_KEY));
    console.log(gusetUser)

    userCart = gusetUser.cart
    for(let i = 0; i < userCart.length; i++){
      if(userCart[i].item.id == productItemId){
        userCart.splice(i, 1);
      }
    }
    gusetUser.cart = userCart;
    
    sessionStorage.setItem(_GUSSET_USER_KEY, JSON.stringify(gusetUser));
    // location.reload();
  }
}
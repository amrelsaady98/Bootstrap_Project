// console.log('hello from product.html')
let categoriesLinksContainer = document.querySelector('#nav-bottom-left');
let categoriesCardsContainer = document.querySelector('.categoriesCardsContainer');

function loadCategoriesLinks() {
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

function addCategories(categories = []) {
  for (let i = categories.length - 1; i >= 0; i--) {
    let newCategory = document.createElement('a');
    newCategory.classList.add('nav-a');
    newCategory.innerText = categories[i].name;
    newCategory.setAttribute("href", "./pages/products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    categoriesLinksContainer.append(newCategory);

    let newCategoryContainer = document.createElement('div');
    let newCategoryCard = document.createElement('div');
    let newCategoryCardImage = document.createElement('img');
    let newCategoryCardText = document.createElement('span');
    let newCategoryCardShowMore = document.createElement('span');

    newCategoryContainer.classList.add("col-sm-12", "col-md-6", "col-lg-4", "col-xl-3");
    newCategoryCard.classList.add('categoryCard');
    newCategoryCardImage.setAttribute('src', categories[i].assets[0].url);
    newCategoryCardText.innerText = categories[i].name;
    newCategoryCardShowMore.innerText = "See more";

    newCategoryCard.append(newCategoryCardText, newCategoryCardImage, newCategoryCardShowMore);
    newCategoryCard.addEventListener('click', () => {
      window.location.assign("./pages/products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    })



    newCategoryContainer.append(newCategoryCard);
    categoriesCardsContainer.append(newCategoryContainer);

  }

}

loadCategoriesLinks();

// search feature
let searchBtn = document.getElementById('nav-search-right');
let searchInput = document.getElementById('nav-search-input');

searchBtn.addEventListener('click', function () {
  window.location.assign(`./pages/products.html?q=${searchInput.value}`);
});
searchInput.addEventListener("keypress",
  (eventHandler) => {
    if (eventHandler.key === "Enter") {
      window.location.assign(`./pages/products.html?q=${searchInput.value}`);
    }
  });

// home slider 
// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll(".sliderImg"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 1,
  intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => {
    slideImage(++imageIndex)
    if (!(imageIndex < images.length)) {
      imageIndex = 0;
    }
  }, 3500);

};
// Call autoSlide function on page load
// autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}vw)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  // autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
// wrapper.addEventListener("mouseleave", autoSlide);




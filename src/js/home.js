// console.log('hello from product.html')
let categoriesLinksContainer = document.querySelector('#nav-bottom-left');
let categoriesCardsContainer = document.querySelector('.categoriesCardsContainer');

function loadCategoriesLinks(){
  fetch('https://api.escuelajs.co/api/v1/categories')
    .then(response => response.json())
    .then((data)=>addCategories(data))
    .catch(error => console.error('Error:', error));
}

function addCategories(categories=[]){
  for (let i = 0; i < 10; i++) {
    let newCategory = document.createElement('a');
    newCategory.classList.add('nav-a');
    newCategory.innerText = categories[i].name;
    newCategory.setAttribute("href", "./pages/products.html?categoryName=" + categories[i].name + "&categoryId=" + categories[i].id);
    categoriesLinksContainer.append(newCategory);

    let newCategoryCard = document.createElement('div');
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

    categoriesCardsContainer.append(newCategoryCard);

  }

}

loadCategoriesLinks();

// search feature
let searchBtn = document.getElementById('nav-search-right');
let searchInput = document.getElementById('nav-search-input');

searchBtn.addEventListener('click', function(){
  window.location .assign(`./pages/products.html?q=${searchInput.value}`);
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
      if(!(imageIndex < images.length)){
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

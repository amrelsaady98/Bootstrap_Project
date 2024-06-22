let picture = document.querySelector('#pic');
let mainContainer = document.querySelector('#picture');
let rect = document.querySelector("#rect");
let zoom = document.querySelector('#zoom');
let picList = document.querySelectorAll(".pic");

let picActive = 0;

let ratio = 3;
let pointerX, pointerY, picOffsetX, picOffsetY;

let picWidth = picture.offsetWidth;
let picHeight = picture.offsetHeight;
let selectorWidthHalf = rect.offsetWidth / 2;
let selectorHeightHalf = rect.offsetHeight / 2;


function changeImage(n) {
  if(picList.length == 0){
    console.log(picList)
    return;
  }
  let imgSrc = picList[n].getAttribute("src");
  picture.src = imgSrc;
  zoom.style.backgroundImage = "url(" + imgSrc + ")";
  picList[picActive].classList.remove('img-active');
  picList[n].classList.add('img-active');
  picActive = n;

  picWidth = picture.offsetWidth;
  picHeight = picture.offsetHeight;
  console.log("width - " + picWidth + " height - " + picHeight);
  zoom.style.backgroundSize = picWidth * ratio + 'px ' + picHeight * ratio + 'px';
}


zoom.style.width = selectorWidthHalf * 4 * ratio + 'px';
zoom.style.height = selectorHeightHalf * 4  * ratio + 'px';



function move(event) {

  pointerX = event.offsetX;
  pointerY = event.offsetY;

  picOffsetX = pointerX - selectorWidthHalf;
  picOffsetY = pointerY - selectorHeightHalf;


  /**
   * incase of selector position approaching the edge of image
   * pointer position = image dimension - selector length for all edgs 
   */
  if (pointerX < selectorWidthHalf || (picWidth - (selectorWidthHalf)) < 0) {
    pointerX = selectorWidthHalf;
    // matching the zoom window with the selector 
    picOffsetX = 0;
  }
  if (pointerX > picWidth - selectorWidthHalf && (picWidth - selectorWidthHalf) > 0) {
    pointerX = picWidth - selectorWidthHalf;
    picOffsetX = pointerX - selectorWidthHalf;
  }
  if (pointerY < selectorHeightHalf || (picHeight - selectorHeightHalf) < 0) {
    pointerY = selectorHeightHalf;
    // matching the zoom window with the selector 
    picOffsetY = 0;
  }
  if (pointerY > picHeight - selectorHeightHalf && (picHeight - selectorHeightHalf) > 0) {
    pointerY = picHeight - selectorHeightHalf;
    picOffsetY = pointerY - selectorHeightHalf;
  }


  rect.style.left = pointerX + 'px';
  rect.style.top = pointerY + 'px';
  zoom.style.backgroundPosition = '-' + picOffsetX * ratio + 'px ' + '-' + picOffsetY * ratio + 'px';
}

mainContainer.addEventListener('mousemove', function (event) {
  move(event);
  addOpacity();
})

function addOpacity() {
  rect.classList.add('rect-active');
  zoom.classList.add('rect-active');
}


function removeOpacity() {
  rect.classList.remove('rect-active');
  zoom.classList.remove('rect-active');
}

picture.addEventListener('mouseout', function () {
  removeOpacity();
})

document.addEventListener('DOMContentLoaded', () => {
  picWidth = picture.offsetWidth;
  picHeight = picture.offsetHeight;
  // changeImage(picActive);
})
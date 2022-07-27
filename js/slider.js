// Variables
const slider = document.querySelector('#slider');
let sliderSection = document.querySelectorAll('.slider__section');
let sliderSectionLast = sliderSection[sliderSection.length - 1];
const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

// Listeners
btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', prev);

// Funciones
function next() {
  let sliderSectionFirst = document.querySelectorAll('.slider__section')[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all .5s";
  setTimeout(() => {
    slider.style.transition = "none";
    slider.insertAdjacentElement("beforeend", sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

function prev() {
  let sliderSection = document.querySelectorAll(".slider__section");
  let sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = "0";
  slider.style.transition = "all .5s";
  setTimeout(() => {
    slider.style.transition = "none";
    slider.insertAdjacentElement("afterbegin", sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

// Slider infinito
setInterval(() => {
  next();
}, 5000);
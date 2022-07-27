// Carga de datos desde un JSON local
document.addEventListener("DOMContentLoaded", getshirts);

const shirtsContainer = document.querySelector("#shirtsContainer");

// Remeras desde JSON
function getshirts() {
  const url = '../data/remeras.json';
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => shirtsHTML(datos))
}

function shirtsHTML(shirts) {

  shirts.forEach((shirt) => {
    const { img, name, price, id } = shirt;
    const shirtsHTML = document.createElement("div");
    shirtsHTML.classList.add("product-hoodie");

    shirtsHTML.innerHTML = `
          <a href="#">
            <img class="hoodie__img" src="${img}" alt="Hoodie">
          </a>
          <h5 class="hoodie__name">${name}</h5>
          <p class="hoodie__price">${price}</p>
          <div class="hoodie__dues">
              <p class="hoodie__dues-info">6 cuotas sin interés de</p>
              <p class="hoodie__dues-price">${Math.round(price / 6)}</p>
          </div>
          <a class="btn-add-cart" href="#" id="hoodieBtn" data-id="${id}">Agregar al carrito</a>
    `;
    // Imprimir en el HTML
    shirtsContainer.appendChild(shirtsHTML);
  });
}
// Variables carrito
const cart = document.querySelector("#cart");
const containerCart = document.querySelector("#list-cart tbody");
const emptyCart = document.querySelector("#empty-cart");
const listHoodies = document.querySelector("#list-of-hoodies");
let itemsCart = [];

// Variables Hoodies
const hoodieContainer = document.querySelector("#hoodieContainer"); // Contenedor hoodies
const selectColor = document.querySelector("#selectColor");
const selectSize = document.querySelector("#selectSize");

loadEventListeners();
function loadEventListeners() {
  // Hoodies
  document.addEventListener("DOMContentLoaded", () => {
    hoodieHTML(hoodiesItems); // Muestra los hoodies
  });

  // Cuando se agrega un hoodie presionando "agregar al carrito"
  listHoodies.addEventListener("click", addProduct);

  // Elimina productos del carrito
  cart.addEventListener("click", deleteProduct);

  // Muestra los productos del Local Storage
  document.addEventListener("DOMContentLoaded", () => {
    itemsCart = JSON.parse(localStorage.getItem("cart")) || [];
    cartHTML();
  });

  // Vaciar el carrito
  emptyCart.addEventListener("click", () => {
    itemsCart = []; // Reseteamos el arreglo
    cleanHTML(); // Eliminamos todo el HTML
    Toastify({
      // Notificacion de vaciado de carrito
      text: "Limpiaste el carrito",
      duration: 1500,
      className: "notificationCart",
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
  });

  // Lee el select y llena el objeto searchData
  selectColor.addEventListener("change", (e) => {
    searchData.color = e.target.value;
    filterProduct();
  });
  selectSize.addEventListener("change", (e) => {
    searchData.size = e.target.value;
    filterProduct();
  });
}

// Funciones
function addProduct(e) {
  e.preventDefault(); // Prevenir que vaya al #
  if (e.target.classList.contains("btn-add-cart")) {
    const selectedProduct = e.target.parentElement;
    readDataProduct(selectedProduct);

    Toastify({
      // Notificacion de agregar un producto
      text: "Se agrego al carrito",
      duration: 1500,
      className: "notificationCart",
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#008542",
      },
    }).showToast();
  }
}

// Elimina un producto del carrito
function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const productId = e.target.getAttribute("data-id");
    // Elimina del arreglo "itemsCart" por el data-id
    itemsCart = itemsCart.filter((product) => product.id !== productId);

    cartHTML(); // Iterar sobre el carrito y mostrar su HTML
    Toastify({
      // Notificacion de agregar un producto
      text: "Eliminaste un producto",
      duration: 1500,
      className: "notificationCart",
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#303030",
      },
    }).showToast();
  }
}
// Lee el HTML al que le dimos click y extrae la informacion del producto
function readDataProduct(product) {
  // console.log(product);

  // Crear un objeto con el contenido del producto actual
  const infoProduct = {
    img: product.querySelector("img").src,
    name: product.querySelector("h5").textContent,
    price: product.querySelector(".hoodie__price").textContent,
    id: product.querySelector(".btn-add-cart").getAttribute("data-id"),
    amount: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const exists = itemsCart.some((product) => product.id === infoProduct.id);
  if (exists) {
    const products = itemsCart.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
        return product; // Retorna el objeto actualizado
      } else {
        return product; // Retorna los objetos que no son los duplicados
      }
    });
    itemsCart = [...products];
  } else {
    // Agrega elementos al arreglo del carrito
    itemsCart = [...itemsCart, infoProduct];
  }
  cartHTML();
}

// Muestra el carrito de compras en el HTML
function cartHTML() {
  cleanHTML(); // Limpiar el HTML

  // Recorre el carrito y genera el HTML
  itemsCart.forEach((product) => {
    const { img, name, price, amount, id } = product;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
          <img src="${img}">
        </td>
        <td>${name}</td>
        <td class="cart-price">${price}</td>
        <td class="cart-amount">${amount}</td>
        <td>
          <a href="#" class="delete-product" data-id="${id}"> X </a>
        </td>
    `;

    // Agrega el HTML del carrito en el tbody
    containerCart.appendChild(row);
  });

  // Agregar el carrito de compras al Storage
  syncStorage();
}

function syncStorage() {
  localStorage.setItem("cart", JSON.stringify(itemsCart));
}

// Limpiar el HTML previo
function cleanHTML() {
  while (containerCart.firstChild) {
    containerCart.removeChild(containerCart.firstChild);
  }
}
// Crear el HTML de los productos
function hoodieHTML(hoodiesItems) {
  cleanHTMLProduct();

  hoodiesItems.forEach((hoodie) => {
    const { img, name, price, id } = hoodie;
    const hoodieHTML = document.createElement("div");
    hoodieHTML.classList.add("product-hoodie");

    hoodieHTML.innerHTML = `
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
    hoodieContainer.appendChild(hoodieHTML);
  });
}

// Limpiar el HTML previo de los productos
function cleanHTMLProduct() {
  while (hoodieContainer.firstChild) {
    hoodieContainer.removeChild(hoodieContainer.firstChild);
  }
}

// Funcion que filtra en base a la busqueda
function filterProduct() {
  const resultFilters = hoodiesItems.filter(filterColor).filter(filterSize);

  if (resultFilters.length) {
    hoodieHTML(resultFilters);
  } else {
    noFilters();
  }
}

function filterColor(hoodie) {
  if (searchData.color) {
    return hoodie.color === searchData.color;
  }
  return hoodie;
}

function filterSize(hoodie) {
  if (searchData.size) {
    return hoodie.size === searchData.size;
  }
  return hoodie;
}

function noFilters() {
  cleanHTMLProduct();
  const noFilters = document.createElement("p");
  noFilters.classList.add("noResult");
  noFilters.textContent = "No hay resultados";
  hoodieContainer.appendChild(noFilters);
}
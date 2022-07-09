// Variables
const cart = document.querySelector("#cart");
const containerCart = document.querySelector("#list-cart tbody");
const emptyCart = document.querySelector("#empty-cart");
const listHoodies = document.querySelector("#list-of-hoodies");
let itemsCart = [];

loadEventListeners();
function loadEventListeners() {
  // Cuando se agrega un hoodie presionando "agregar al carrito"
  listHoodies.addEventListener('click', addProduct);

  // Elimina productos del carrito
  cart.addEventListener('click', deleteProduct);

  // Muestra los cursos del Local Storage
  document.addEventListener('DOMContentLoaded', ()=>{
    itemsCart = JSON.parse( localStorage.getItem('cart')) || [];

    cartHTML();
  });

  // Vaciar el carrito
  emptyCart.addEventListener('click', ()=>{
    itemsCart = []; // Reseteamos el arreglo
    cleanHTML()  // Eliminamos todo el HTML
  })
}

// Funciones
function addProduct(e) {
  e.preventDefault(); // Prevenir que vaya al #
  if (e.target.classList.contains("btn-add-cart")) {
    const selectedProduct = e.target.parentElement;
    readDataProduct(selectedProduct);
  }
}

// Elimina un producto del carrito
function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const productId = e.target.getAttribute("data-id");
    // Elimina del arreglo "itemsCart" por el data-id
    itemsCart = itemsCart.filter((product) => product.id !== productId);

    cartHTML(); // Iterar sobre el carrito y mostrar su HTML
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
    amount: 1
  };

  // Revisa si un elemento ya existe en el carrito 
  const existe = itemsCart.some( product => product.id === infoProduct.id);
  if (existe) {
    const products = itemsCart.map(product =>{
      if (product.id === infoProduct.id) {
        product.amount++;
        return product;  // Retorna el objeto actualizado
      } else {
        return product;  // Retorna los objetos que no son los duplicados
      }
    });
    itemsCart = [...products]
  } else {
    // Agrega elementos al arreglo del carrito
    itemsCart = [...itemsCart, infoProduct];
  }

  console.log(itemsCart);

  cartHTML();
}

// Muestra el carrito de compras en el HTML
function cartHTML() {
  cleanHTML(); // Limpiar el HTML

  // Recorre el carrito y genera el HTML
  itemsCart.forEach( product => {
    const { img, name, price, amount, id } = product;
    const row = document.createElement('tr');
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
  localStorage.setItem('cart', JSON.stringify(itemsCart));
}

// Limpiar el HTML previo
function cleanHTML() {
  while (containerCart.firstChild) {
    containerCart.removeChild(containerCart.firstChild);
  }
}
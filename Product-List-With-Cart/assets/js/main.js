// // Array to store product details
// const products = [
//   { id: 1, name: 'Waffle with Berries', price: 6.50, image: './assets/images/waffle-image.png' },
//   { id: 2, name: 'Vanilla Bean Crème Brûlée', price: 7.00, image: './assets/images/vanilla-image.png' },
//   { id: 3, name: 'Macaron Mix of Five', price: 8.00, image: './assets/images/macaron-image.png' },
//   { id: 4, name: 'Classic Tiramisu', price: 5.50, image: './assets/images/tiramisu-image.png' },
//   { id: 5, name: 'Pistachio Baklava', price: 4.00, image: './assets/images/baklava-image.png' },
//   { id: 6, name: 'Lemon Meringue Pie', price: 5.00, image: './assets/images/pie-image.png' },
//   { id: 7, name: 'Red Velvet Cake', price: 4.50, image: './assets/images/redvelvet-image.png' },
//   { id: 8, name: 'Salted Caramel Brownie', price: 5.50, image: './assets/images/brownie-image.png' },
//   { id: 9, name: 'Vanilla Panna Cotta', price: 6.50, image: './assets/images/pannacotta-image.png' }
// ];

// Initialize the cart as an empty array
let cart = [];

// Function to render the products on the page
function renderProducts() {
  const productContainer = document.querySelector('.product-list');
  products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('items');
      productDiv.dataset.id = product.id;

      // // Product structure with image, name, price, and Add to Cart button
      // productDiv.innerHTML = `
      //     <div class="product">
      //         <img src="${product.image}" alt="${product.name}">
      //         <button class="add-to-cart">Add to Cart</button>
      //         <div class="quantity-control" style="display: none;">
      //             <button class="decrease-quantity">-</button>
      //             <span class="quantity">1</span>
      //             <button class="increase-quantity">+</button>
      //         </div>
      //     </div>
      //     <div class="product-content">
      //         <h5>${product.name.split(' ')[0]}</h5>
      //         <h3>${product.name}</h3>
      //         <p>$${product.price.toFixed(2)}</p>
      //     </div>
      // `;
      productContainer.appendChild(productDiv);
  });
}

// Function to add product to the cart and switch to quantity control view
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  // If product already in the cart, increase quantity; else add to cart
  if (cartItem) {
      cartItem.quantity++;
  } else {
      cart.push({ ...product, quantity: 1 });
      switchToQuantityControl(productId); // Switch "Add to Cart" to quantity control
  }

  updateCartDisplay(); // Update cart display after adding product
}

// Function to switch "Add to Cart" button to quantity controls
function switchToQuantityControl(productId) {
  const productDiv = document.querySelector(`.items[data-id="${productId}"]`);
  const addToCartButton = productDiv.querySelector('.add-to-cart');
  const quantityControl = productDiv.querySelector('.quantity-control');
  const quantitySpan = quantityControl.querySelector('.quantity');

  // Hide "Add to Cart" and show quantity controls
  addToCartButton.style.display = 'none';
  quantityControl.style.display = 'flex';
  quantitySpan.textContent = 1; // Set initial quantity to 1
}

// Function to update the cart display with items and prices
function updateCartDisplay() {
  const cartContent = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  const totalPrice = document.getElementById('total-price');
  let total = 0;

  // Clear current cart display
  cartContent.innerHTML = '';

  cart.forEach(item => {
      total += item.price * item.quantity;

      // Create cart item display
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
          <p>${item.name} x${item.quantity}</p>
          <p>$${(item.price * item.quantity).toFixed(2)}</p>
      `;

      cartContent.appendChild(cartItemDiv);
  });

  totalPrice.textContent = total.toFixed(2);

  // Show cart summary and hide empty cart message if there are items
  if (cart.length > 0) {
      cartSummary.style.display = 'block';
  } else {
      cartSummary.style.display = 'none';
  }
}

// Event listener for adding products to the cart
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
      const productDiv = e.target.closest('.items');
      const productId = parseInt(productDiv.dataset.id);
      addToCart(productId);
  }
});

// Initial render of products
renderProducts();

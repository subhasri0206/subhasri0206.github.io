// Array to store product details
const products = [
  { id: 1, name: 'Waffle with Berries', price: 6.50, image: './assets/images/waffle-image.png' },
  { id: 2, name: 'Vanilla Bean Crème Brûlée', price: 7.00, image: './assets/images/vanilla-image.png' },
  { id: 3, name: 'Macaron Mix of Five', price: 8.00, image: './assets/images/macaron-image.png' },
  { id: 4, name: 'Classic Tiramisu', price: 5.50, image: './assets/images/tiramisu-image.png' },
  { id: 5, name: 'Pistachio Baklava', price: 4.00, image: './assets/images/baklava-image.png' },
  { id: 6, name: 'Lemon Meringue Pie', price: 5.00, image: './assets/images/pie-image.png' },
  { id: 7, name: 'Red Velvet Cake', price: 4.50, image: './assets/images/redvelvet-image.png' },
  { id: 8, name: 'Salted Caramel Brownie', price: 5.50, image: './assets/images/brownie-image.png' },
  { id: 9, name: 'Vanilla Panna Cotta', price: 6.50, image: './assets/images/pannacotta-image.png' }
];

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
      // productContainer.appendChild(productDiv);
  });
}

document.querySelectorAll('.product').forEach(product => {
  const button = product.querySelector('.add-to-cart');
  const productImage = product.querySelector('.product-image');

  button.addEventListener('click', () => {
    productImage.classList.add('in-cart');
  });
});


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

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
      cartItem.quantity++;
      updateQuantityInUI(productId, cartItem.quantity); // Update the UI with new quantity
      updateCartDisplay(); // Refresh the cart display
  }
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      updateQuantityInUI(productId, cartItem.quantity); // Update the UI with new quantity
      updateCartDisplay(); // Refresh the cart display
  } else if (cartItem && cartItem.quantity === 1) {
      // Remove the item from the cart if quantity is 1 and decrease button is clicked
      cart = cart.filter(item => item.id !== productId);
      resetAddToCartButton(productId); // Reset "Add to Cart" button
      updateCartDisplay(); // Refresh the cart display
  }
}

// Function to update the quantity shown in the product UI
function updateQuantityInUI(productId, quantity) {
  const productDiv = document.querySelector(`.items[data-id="${productId}"]`);
  const quantitySpan = productDiv.querySelector('.quantity');
  quantitySpan.textContent = quantity; // Update the displayed 
}

// Function to reset the "Add to Cart" button when item is removed from the cart
function resetAddToCartButton(productId) {
  const productDiv = document.querySelector(`.items[data-id="${productId}"]`);
  const addToCartButton = productDiv.querySelector('.add-to-cart');
  const quantityControl = productDiv.querySelector('.quantity-control');

  // Hide quantity control and show "Add to Cart" button
  quantityControl.style.display = 'none';
  addToCartButton.style.display = 'block';
}

// Function to update the cart display with items and prices
// function updateCartDisplay() {
//   const cartContent = document.querySelector('.cart-items');
//   const cartSummary = document.querySelector('.cart-summary');
//   const totalPrice = document.getElementById('total-price');
//   const emptyCartContent = document.querySelector('.cart-content');
//   let total = 0;

//   // Clear current cart display
//   cartContent.innerHTML = '';

//   cart.forEach(item => {
//       total += item.price * item.quantity;
//       // Create cart item display
//       const cartItemDiv = document.createElement('div');
//       cartItemDiv.classList.add('cart-item');
//       cartItemDiv.innerHTML = `
//           <p>${item.name} </p> <span> ${item.quantity}x </span> <h4>@ $${item.price}</h4> <h5>$${(item.price * item.quantity).toFixed(2)}</h5>
//           <hr>
//       `;

//       cartContent.appendChild(cartItemDiv);
//   });

//   totalPrice.textContent = total.toFixed(2);

//   // Show cart summary and hide empty cart message if there are items
//   if (cart.length > 0) {
//     cartSummary.style.display = 'block'; // Show the cart summary
//     emptyCartContent.style.display = 'none'; // Hide the empty cart content
//   } 
//   else {
//     cartSummary.style.display = 'none'; // Hide the cart summary
//     emptyCartContent.style.display = 'flex'; // Show the empty cart content
//   }
// }
function updateCartDisplay() {
  const cartContent = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  const totalPrice = document.getElementById('total-price');
  const emptyCartContent = document.querySelector('.cart-content');
  const cartHeading = document.querySelector('.cart-section h3');
  let total = 0;
  let itemCount = 0;

  // Clear current cart display
  cartContent.innerHTML = '';

  cart.forEach(item => {
      total += item.price * item.quantity;
      itemCount += item.quantity;
      // Create cart item display with styled quantities, prices, totals, and a close button
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
      <div class=cartItem>
        <div class="cart-item-details">
          <span class="cart-item-name">${item.name}</span>
          <div class="inner-items">
            <span class="cart-item-quantity">${item.quantity}x</span>
            <span class="cart-item-price">@ $${item.price.toFixed(2)}</span>
            <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
      </div>
      <hr>
      `;

      cartContent.appendChild(cartItemDiv);
  });

  totalPrice.textContent = total.toFixed(2);

  // Update the cart heading with item count
  cartHeading.textContent = `Your Cart (${itemCount})`;

  // Show cart summary and hide empty cart message if there are items
  if (cart.length > 0) {
    cartSummary.style.display = 'block'; // Show the cart summary
    emptyCartContent.style.display = 'none'; // Hide the empty cart content
  } 
  else {
    cartSummary.style.display = 'none'; // Hide the cart summary
    emptyCartContent.style.display = 'flex'; // Show the empty cart content
    cartHeading.textContent = 'Your Cart (0)'; // Reset heading when empty
  }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  // Remove item from cart
  cart = cart.filter(item => item.id !== productId); 

  // Reset the product view in the product list
  const productDiv = document.querySelector(`.items[data-id="${productId}"]`);
  if (productDiv) {
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    const quantityControl = productDiv.querySelector('.quantity-control');

    if (addToCartButton && quantityControl) {
      addToCartButton.style.display = 'block'; // Show "Add to Cart" button
      quantityControl.style.display = 'none'; // Hide quantity controls

    }
  }

  // Refresh cart display
  updateCartDisplay();
}

// Ensure cart heading starts with (0) initially
const initialCartHeading = document.querySelector('.cart-section h3');
if (initialCartHeading) {
  initialCartHeading.textContent = 'Your Cart (0)';
}

// Function to update quantity in the cart
function updateQuantity(productId, action) {
  const cartItem = cart.find(item => item.id === productId);

  if (action === 'increase') {
      cartItem.quantity++;
  } else if (action === 'decrease' && cartItem.quantity > 1) {
      cartItem.quantity--;
  } else if (action === 'decrease' && cartItem.quantity === 1) {
      // Remove item from cart if quantity is 1 and decreasing
      cart = cart.filter(item => item.id !== productId);
      // Switch back to "Add to Cart" button view
      switchToAddToCartButton(productId);
  }

  updateCartDisplay(); // Update cart display after changing quantity
}

// Function to switch back to "Add to Cart" button when quantity is 0
function switchToAddToCartButton(productId) {
  const productDiv = document.querySelector(`.items[data-id="${productId}"]`);
  const addToCartButton = productDiv.querySelector('.add-to-cart');
  const quantityControl = productDiv.querySelector('.quantity-control');

  // Show "Add to Cart" and hide quantity controls
  addToCartButton.style.display = 'block';
  quantityControl.style.display = 'none';
}

// Event listener for adding products to the cart
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
      const productDiv = e.target.closest('.items');
      const productId = parseInt(productDiv.dataset.id);
      addToCart(productId);
  }

  // Event listener for increasing and decreasing quantity
  if (e.target.classList.contains('increase-quantity')) {
      const productDiv = e.target.closest('.items');
      const productId = parseInt(productDiv.dataset.id);
      increaseQuantity(productId); // Use increaseQuantity directly
  }

  if (e.target.classList.contains('decrease-quantity')) {
      const productDiv = e.target.closest('.items');
      const productId = parseInt(productDiv.dataset.id);
      decreaseQuantity(productId); // Use decreaseQuantity directly
  }
});

function confirmOrder() {
  const confirmedItemsDiv = document.querySelector('.confirmed-items');
  const confirmedTotal = document.getElementById('confirmed-total');
  
  // Clear previous items
  confirmedItemsDiv.innerHTML = '';
  
  // Update confirmed items and total
  cart.forEach(item => {
        // Create an image element for the product
        const image = document.createElement('img');
        image.className = 'product-images';
        image.src = `${item.image}`; // Assuming item.image contains the URL of the product image
        image.alt = `${item.name}`;

        // Create a container for the product image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        imageContainer.appendChild(image);

        // Create a container for the product name
        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = `${item.name}`;

        const nameAndDetailsContainer = document.createElement('div');
        nameAndDetailsContainer.className = 'name-and-details'; // Flex direction set to row for name and details

        // Create a container for price and quantity
        const quantity = document.createElement('p');
        quantity.className = 'item-quantity';
        quantity.textContent = `${item.quantity}x`;

        const price = document.createElement('h5');
        price.className = 'item-price';
        price.textContent = `@ $${item.price.toFixed(2)}`;

        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'item-details';
        detailsContainer.append(quantity, price);

        // Append name and details into the same row container
        nameAndDetailsContainer.appendChild(name);
        nameAndDetailsContainer.appendChild(detailsContainer);

        // Create a container for the total price
        const total = document.createElement('h4');
        total.className = 'item-total';
        total.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        const totalContainer = document.createElement('div');
        totalContainer.className = 'item-total-container';
        totalContainer.appendChild(total);

        // Create the main container for the order details
        const orderDetailsContainer = document.createElement('div');
        orderDetailsContainer.className = 'order-details';
        orderDetailsContainer.appendChild(imageContainer); // Add the image container
        orderDetailsContainer.appendChild(nameAndDetailsContainer); // Add the name and details container
        orderDetailsContainer.appendChild(totalContainer); // Add the total container

        // Append the main order details container to the confirmed items div
        confirmedItemsDiv.appendChild(orderDetailsContainer);

        // Add a horizontal line after each item
        const hr = document.createElement('hr');
        hr.className = 'item-divider';
        confirmedItemsDiv.appendChild(hr);
  });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  confirmedTotal.textContent = `${total.toFixed(2)}`;

  // Show the order confirmation modal
  document.querySelector('.order-confirmation').style.display = 'block';
}

function startNewOrder() {
  // Clear the cart
  cart = [];
  
  // Refresh the cart display
  updateCartDisplay();

  // Hide the order confirmation modal
  const orderConfirmationModal = document.querySelector('.order-confirmation');
  if (orderConfirmationModal) {
    orderConfirmationModal.style.display = 'none'; // Ensure the modal is hidden
  }

  // Optionally, ensure the main page is visible (if using a separate main page element)
  const mainPage = document.querySelector('.main-page');
  if (mainPage) {
    mainPage.style.display = 'block'; // Make sure the main page is visible
  }

  // Reset all product views back to the initial state
  resetProductViews();
}

// Function to reset the product views (reset "Add to Cart" and hide quantity controls)
function resetProductViews() {
  const productDivs = document.querySelectorAll('.items');

  productDivs.forEach(productDiv => {
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    const quantityControl = productDiv.querySelector('.quantity-control');

    // Reset "Add to Cart" button and hide quantity controls
    if (addToCartButton) {
      addToCartButton.style.display = 'block'; // Show "Add to Cart" button again
    }
    if (quantityControl) {
      quantityControl.style.display = 'none'; // Hide quantity controls
    }
  });
}


// Initial render of products
renderProducts();
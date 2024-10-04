// Array to store product details
const products = [
    { id: 1, name: 'Product 1', price: 10.00, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 30.00, image: 'product1.jpg' },
    // Add more products as necessary
  ];
  
  // Initialize the cart as an empty array
  let cart = [];
  
  // Function to render the products on the page
  function renderProducts() {
    const productContainer = document.querySelector('.product-list');
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.dataset.id = product.id;
  
      // Product structure with image, name, price, and Add to Cart button
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
        <div class="quantity-control" style="display: none;">
          <button class="decrease-quantity">-</button>
          <span class="quantity">1</span>
          <button class="increase-quantity">+</button>
        </div>
      `;
  
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
    const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    const quantityControl = productDiv.querySelector('.quantity-control');
    const quantitySpan = quantityControl.querySelector('.quantity');
  
    // Hide "Add to Cart" and show quantity controls
    addToCartButton.style.display = 'none';
    quantityControl.style.display = 'flex';
    quantitySpan.textContent = 1; // Set initial quantity to 1
  }
  
  // Function to update the quantity of products in the cart
  function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += change;
  
      // If quantity is zero or less, remove the item from cart
      if (cartItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
        switchToAddToCart(productId); // Switch back to "Add to Cart"
      } else {
        // Update displayed quantity
        const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
        const quantitySpan = productDiv.querySelector('.quantity');
        quantitySpan.textContent = cartItem.quantity;
      }
    }
  
    updateCartDisplay(); // Update the cart display
  }
  
  // Function to switch back to "Add to Cart" button when quantity is 0
  function switchToAddToCart(productId) {
    const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    const quantityControl = productDiv.querySelector('.quantity-control');
  
    // Show "Add to Cart" and hide quantity controls
    addToCartButton.style.display = 'block';
    quantityControl.style.display = 'none';
  }
  
  // Function to update cart display and calculate total price
  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items
  
    let totalPrice = 0;
  
    // Loop through cart items and display each one
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
  
      const cartItemDiv = document.createElement('div');
      cartItemDiv.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItemDiv);
    });
  
    // Display total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  
    // Show or hide the cart summary depending on whether the cart is empty
    document.querySelector('.cart-summary').style.display = cart.length > 0 ? 'block' : 'none';
  }
  
  // Event listeners for various cart actions
  document.addEventListener('click', function(event) {
    // Add to Cart button
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.closest('.product').dataset.id);
      addToCart(productId);
    }
  
    // Increase quantity button
    if (event.target.classList.contains('increase-quantity')) {
      const productId = parseInt(event.target.closest('.product').dataset.id);
      updateQuantity(productId, 1);
    }
  
    // Decrease quantity button
    if (event.target.classList.contains('decrease-quantity')) {
      const productId = parseInt(event.target.closest('.product').dataset.id);
      updateQuantity(productId, -1);
    }
  
    // Remove item button in the cart
    if (event.target.classList.contains('remove-item')) {
      const productId = parseInt(event.target.dataset.id);
      cart = cart.filter(item => item.id !== productId); // Remove the item from cart
      updateCartDisplay(); // Update cart
      switchToAddToCart(productId); // Switch back to "Add to Cart"
    }
  
    // Confirm order button
    if (event.target.id === 'confirm-order') {
      document.querySelector('.order-confirmation').style.display = 'block';
      document.querySelector('main').style.display = 'none';
  
      const confirmedItems = document.querySelector('.confirmed-items');
      confirmedItems.innerHTML = ''; // Clear confirmed items
  
      // Display confirmed items
      cart.forEach(item => {
        confirmedItems.innerHTML += `<p>${item.name} x ${item.quantity}</p>`;
      });
  
      // Display total price of confirmed order
      document.getElementById('confirmed-total').textContent = document.getElementById('total-price').textContent;
    }
  
    // Start new order button
    if (event.target.id === 'start-new-order') {
      cart = []; // Reset the cart
      document.querySelector('.order-confirmation').style.display = 'none';
      document.querySelector('main').style.display = 'flex';
      updateCartDisplay(); // Update cart display
    }
  });
  
  // Function to reset the cart and reset buttons to "Add to Cart"
  function resetCart() {
    cart = []; // Empty the cart array
    updateCartDisplay(); // Update the cart display
  
    // Reset product buttons to show "Add to Cart"
    const productContainers = document.querySelectorAll('.product');
    productContainers.forEach((productContainer) => {
      const addButton = productContainer.querySelector('.add-to-cart');
      const quantityControl = productContainer.querySelector('.quantity-control');
  
      // Hide quantity control and show the "Add to Cart" button
      if (quantityControl) {
        quantityControl.remove();
      }
  
      if (addButton) {
        addButton.style.display = 'block';
      }
    });
  
    // Scroll to the top of the page or refresh the UI (optional)
    window.scrollTo(0, 0);
  }
  
  // Attach resetCart to the "Start New Order" button
  document.getElementById('start-new-order').addEventListener('click', resetCart);  
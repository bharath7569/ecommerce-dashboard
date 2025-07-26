
document.addEventListener('DOMContentLoaded', () => {
    // Sample Product Data (You can expand this)
    const products = [{
            id: 'p1',
            name: 'Wireless Bluetooth Headphones',
            description: 'Experience immersive sound with these comfortable and stylish wireless headphones. Up to 20 hours of battery life.',
            price: 59.99,
            image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Headphones' // Placeholder image
        },
        {
            id: 'p2',
            name: 'Smartwatch with Fitness Tracker',
            description: 'Track your steps, heart rate, and sleep. Receive notifications directly on your wrist. Water-resistant design.',
            price: 99.99,
            image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Smartwatch' // Placeholder image
        },
        {
            id: 'p3',
            name: 'Portable Bluetooth Speaker',
            description: 'Powerful sound in a compact design. Perfect for outdoor adventures or indoor parties. Long-lasting battery.',
            price: 39.99,
            image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Speaker' // Placeholder image
        },
        {
            id: 'p4',
            name: 'High-Speed USB-C Hub',
            description: 'Expand your laptop\'s connectivity with multiple USB 3.0 ports, HDMI, and an SD card reader. Plug and play.',
            price: 24.99,
            image: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=USBHub' // Placeholder image
        },
        {
            id: 'p5',
            name: 'Ergonomic Wireless Mouse',
            description: 'Comfortable design for long hours of use. Precise tracking and customizable buttons for enhanced productivity.',
            price: 19.99,
            image: 'https://via.placeholder.com/150/A1FF33/FFFFFF?text=Mouse' // Placeholder image
        }
    ];

    let cart = []; // Shopping cart array

    // DOM Elements
    const productListSection = document.getElementById('product-list-section');
    const productDetailSection = document.getElementById('product-detail-section');
    const cartSection = document.getElementById('cart-section');
    const checkoutSection = document.getElementById('checkout-section');

    const productListDiv = document.getElementById('product-list');
    const productDetailContent = document.getElementById('product-detail-content');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const cartTotalSpan = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutMessageDiv = document.getElementById('checkout-message');

    const viewCartButton = document.getElementById('view-cart-button');
    const backToProductsButton = document.getElementById('back-to-products');
    const checkoutButton = document.getElementById('checkout-button');
    const continueShoppingButton = document.getElementById('continue-shopping-button');
    const backToCartFromCheckoutButton = document.getElementById('back-to-cart-from-checkout');

    // Function to render product list
    function renderProductList() {
        productListDiv.innerHTML = ''; // Clear previous content
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button data-product-id="${product.id}" class="add-to-cart-button">Add to Cart</button>
                <button data-product-id="${product.id}" class="view-details-button">View Details</button>
            `;
            productListDiv.appendChild(productCard);
        });

        // Add event listeners for "Add to Cart" and "View Details" buttons
        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                addToCart(productId);
            });
        });

        document.querySelectorAll('.view-details-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                showProductDetails(productId);
            });
        });
    }

    // Function to show product details
    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            productDetailContent.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button data-product-id="${product.id}" class="add-to-cart-button-detail">Add to Cart</button>
                </div>
            `;
            switchSection(productDetailSection);

            document.querySelector('.add-to-cart-button-detail').addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                addToCart(productId);
            });
        }
    }

    // Function to add a product to the cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingCartItem = cart.find(item => item.id === productId);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            updateCartUI();
            alert(`${product.name} added to cart!`);
        }
    }

    // Function to update cart UI
    function updateCartUI() {
        cartItemCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsDiv.innerHTML = ''; // Clear previous cart items

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            checkoutButton.disabled = true;
        } else {
            emptyCartMessage.classList.add('hidden');
            checkoutButton.disabled = false;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-product-id="${item.id}">+</button>
                        </div>
                        <button class="remove-from-cart-button" data-product-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
            });
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = total.toFixed(2);

        // Add event listeners for quantity control and remove buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity++;
                    updateCartUI();
                }
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const item = cart.find(i => i.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    updateCartUI();
                }
            });
        });

        document.querySelectorAll('.remove-from-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                cart = cart.filter(item => item.id !== productId);
                updateCartUI();
            });
        });
    }

    // Function to switch between sections
    function switchSection(activeSection) {
        [productListSection, productDetailSection, cartSection, checkoutSection].forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        activeSection.classList.remove('hidden-section');
        activeSection.classList.add('active-section');
    }

    // Event Listeners for navigation and actions
    viewCartButton.addEventListener('click', () => {
        switchSection(cartSection);
        updateCartUI(); // Ensure cart UI is up-to-date when viewed
    });

    backToProductsButton.addEventListener('click', () => {
        switchSection(productListSection);
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            checkoutMessageDiv.innerHTML = `
                <p>Thank you for your purchase!</p>
                <p>Your order for items totaling **$${total.toFixed(2)}** has been placed.</p>
                <p>You will receive an email confirmation shortly.</p>
            `;
            cart = []; // Clear the cart after checkout
            updateCartUI(); // Update cart count in header
            switchSection(checkoutSection);
        } else {
            alert('Your cart is empty. Please add items before checking out.');
            switchSection(cartSection); // Go back to cart if empty
        }
    });

    continueShoppingButton.addEventListener('click', () => {
        switchSection(productListSection);
    });

    backToCartFromCheckoutButton.addEventListener('click', () => {
        switchSection(cartSection);
    });

    // Initial render
    renderProductList();
    updateCartUI(); // Initialize cart count on page load
});

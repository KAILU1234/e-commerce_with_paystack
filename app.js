// ========================================
// SELECT ELEMENTS
// ========================================

const myProduct = document.querySelector(".gadgets");
const subtotalEl = document.getElementById("totalPrice");
const totalItemsInCartEl = document.getElementById("cartspan");

const cartDiv = document.getElementById("cartdiv");
const cartModal = document.getElementById("cartModal");
const continueBtn = document.getElementById("continueBtn");

// Form elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const checkoutForm = document.getElementById("checkoutForm");
const errorElement = document.getElementById("error");


// ========================================
// CART
// ========================================

// Get cart from Local Storage
let cart = JSON.parse(localStorage.getItem("CART")) || [];


// ========================================
// RENDER PRODUCTS ON SHOP PAGE
// ========================================

function renderProducts() {

    // Stop if this page does not have products
    if (!myProduct) return;

    // Clear the container first
    myProduct.innerHTML = "";

    products.forEach((product) => {

        // Check whether this product is already in the cart
        const productIsInCart = cart.some(
            (item) => item.id === product.id
        );

        myProduct.innerHTML += `
            <div 
                class="sub-div ${productIsInCart ? "in-cart" : ""}" 
                data-id="${product.id}"
            >

                <div class="product-info">

                    <div class="image-container">

                        <img 
                            class="product-image" 
                            src="${product.imgSrc}" 
                            alt="${product.name}"
                        >

                        <div class="price-overlay">
                            <p class="price-title">PRICE</p>
                            <p class="price-value">₵${product.price}</p>
                        </div>

                    </div>

                    <p class="product-name">${product.name}</p>

                </div>

                <button onclick="addToCart('${product.id}')">
                    ${productIsInCart
                        ? "REMOVE FROM CART"
                        : "ADD TO CART"}
                </button>

            </div>
        `;
    });
}


// ========================================
// ADD OR REMOVE PRODUCT FROM CART
// ========================================

function addToCart(id) {

    // Check if the item is already in the cart
    const itemAlreadyInCart = cart.some(
        (item) => item.id === id
    );

    if (itemAlreadyInCart) {

        // If already in cart, remove it
        removeItemFromCart(id);

    } else {

        // Find the product in products.js
        const product = products.find(
            (product) => product.id === id
        );

        // Add it to the cart
        cart.push({
            ...product,
            numberOfUnits: 1
        });

        // Update everything
        updateCart();
    }

    // Update the shop buttons
    renderProducts();
}


// ========================================
// REMOVE ITEM FROM CART
// ========================================

function removeItemFromCart(id) {

    // Keep every item EXCEPT the selected one
    cart = cart.filter(
        (item) => item.id !== id
    );

    // Update cart display and Local Storage
    updateCart();

    // Update Shop page button
    renderProducts();
}


// ========================================
// CHANGE QUANTITY
// ========================================

function ChangeNumberOfUnits(action, id) {

    cart = cart.map((item) => {

        if (item.id === id) {

            if (
                action === "minus" &&
                item.numberOfUnits > 1
            ) {
                return {
                    ...item,
                    numberOfUnits: item.numberOfUnits - 1
                };
            }

            if (action === "plus") {
                return {
                    ...item,
                    numberOfUnits: item.numberOfUnits + 1
                };
            }
        }

        return item;
    });

    updateCart();
}


// ========================================
// UPDATE THE ENTIRE CART
// ========================================

function updateCart() {

    renderCartItemsList();
    renderSubtotal();

    // Save the current cart
    localStorage.setItem(
        "CART",
        JSON.stringify(cart)
    );
}


// ========================================
// RENDER CART ITEMS
// ========================================

function renderCartItemsList() {

    const cartTableBody =
        document.getElementById("cartTableBody");

    // Stop if this page doesn't have the cart table
    if (!cartTableBody) return;

    // Clear previous rows
    cartTableBody.innerHTML = "";

    cart.forEach((item, index) => {

        cartTableBody.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>₵${item.price}</td>

                <td>

                    <button
                        onclick="ChangeNumberOfUnits(
                            'minus',
                            '${item.id}'
                        )"
                    >
                        -
                    </button>

                    ${item.numberOfUnits}

                    <button
                        onclick="ChangeNumberOfUnits(
                            'plus',
                            '${item.id}'
                        )"
                    >
                        +
                    </button>

                </td>

                <td>

                    <button
                        onclick="removeItemFromCart('${item.id}')"
                    >
                        Remove
                    </button>

                </td>

            </tr>
        `;
    });
}


// ========================================
// CALCULATE SUBTOTAL AND CART COUNT
// ========================================

function renderSubtotal() {

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {

        totalPrice +=
            item.price * item.numberOfUnits;

        totalItems +=
            item.numberOfUnits;
    });

    // Update total price
    if (subtotalEl) {
        subtotalEl.innerHTML =
            `₵${totalPrice.toFixed(2)}`;
    }

    // Update number on cart icon
    if (totalItemsInCartEl) {
        totalItemsInCartEl.innerHTML = totalItems;
    }
}


// ========================================
// OPEN CART MODAL
// ========================================

if (cartDiv && cartModal) {

    cartDiv.addEventListener("click", () => {

        updateCart();

        cartModal.style.display = "flex";
    });
}


// ========================================
// CLOSE CART MODAL
// ========================================

if (continueBtn && cartModal) {

    continueBtn.addEventListener("click", () => {

        cartModal.style.display = "none";
    });
}


// ========================================
// FORM VALIDATION FUNCTIONS
// ========================================

function validateName() {

    // If this page has no name field, stop
    if (!nameInput) return "";

    if (nameInput.value.trim() === "") {
        return "Name is required!";
    }

    return "";
}


function validateEmail() {

    if (!emailInput) return "";

    const emailValue =
        emailInput.value.trim();

    // Correct email pattern
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        return "Email is required!";
    }

    if (!emailPattern.test(emailValue)) {
        return "Please enter a valid email address!";
    }

    return "";
}


function validatePhone() {

    if (!phoneInput) return "";

    const phoneValue =
        phoneInput.value.trim();

    // Exactly 10 digits
    const phonePattern = /^\d{10}$/;

    if (phoneValue === "") {
        return "Phone number is required!";
    }

    if (!phonePattern.test(phoneValue)) {
        return "Phone number must contain exactly 10 digits!";
    }

    return "";
}


// ========================================
// VALIDATE EACH FIELD WHEN USER LEAVES IT
// ========================================

if (nameInput && errorElement) {

    nameInput.addEventListener("blur", () => {

        errorElement.innerText =
            validateName();
    });
}


if (emailInput && errorElement) {

    emailInput.addEventListener("blur", () => {

        errorElement.innerText =
            validateEmail();
    });
}


if (phoneInput && errorElement) {

    phoneInput.addEventListener("blur", () => {

        errorElement.innerText =
            validatePhone();
    });
}


// ========================================
// CHECKOUT FORM SUBMISSION
// ========================================

if (checkoutForm && errorElement) {

    checkoutForm.addEventListener(
        "submit",
        (e) => {

            // Stop the form from refreshing the page
            e.preventDefault();

            console.log(
                "CHECKOUT BUTTON WAS CLICKED"
            );

            let messages = [];

            // Validate name
            const nameError = validateName();

            if (nameError) {
                messages.push(nameError);
            }


            // Validate email
            const emailError = validateEmail();

            if (emailError) {
                messages.push(emailError);
            }


            // Validate phone
            const phoneError = validatePhone();

            if (phoneError) {
                messages.push(phoneError);
            }


// If there are errors
if(messages.length > 0){
    errorElement.innerText = messages.join(", ");
    console.log("VALIDATION FAILED:", messages);
    return;
}
errorElement.innerText = "";
const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim()
};
const order = {
    user: user,
    cart: cart
};
console.log("USER:", user);

alert("Validation passed! Ready for checkout.");
            // PAYSTACK CODE WILL GO HERE
        }
    );
}


// ========================================
// INITIALIZE APPLICATION
// ========================================

renderProducts();
updateCart();

console.log("App.js is running");
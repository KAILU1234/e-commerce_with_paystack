//SELECT ELEMENTS
const myProduct = document.querySelector(".gadgets");
const totalItems = document.querySelector(".totalItemsInCart");  
const subtotalEl = document.getElementById("totalPrice");
const totalItemsInCartEl = document.getElementById("cartspan");

// form validation
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const checkoutForm = document.getElementById("checkoutForm");
const errorElement = document.getElementById("error");


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


////////////////////TRIAL/////////////////////
if (myProduct){
    function renderProducts(){
    products.forEach( (product) => {
        myProduct.innerHTML += `
            <div class="sub-div" data-id ="${product.id}">
                <div class="product-info">
                    <div class="image-container">
                        <img class="product-image" src="${product.imgSrc}" alt="">
                        <div class="price-overlay">
                            <p class="price-title">PRICE</p>
                            <p class="price-value">₵${product.price}</p>
                        </div>
                    </div>
                    <p class="product-name">${product.name}</p>
                </div>
            <button onclick="addToCart('${product.id}')">ADD TO CART</button>
            </div>
        `
    })
}
renderProducts();
}

function addToCart(id) {

    const card = document.querySelector(`[data-id="${id}"]`);

    card.classList.toggle("in-cart");

    const button = card.querySelector("button");

    if (card.classList.contains("in-cart")) {

        button.textContent = "REMOVE FROM CART";

        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1
        });

        // updateCart();
    } else {

        button.textContent = "ADD TO CART";

        removeItemFromCart(id);
    }

    updateCart();
    
}

//update cart
function updateCart(){
    renderCartItemsList();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}


//calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0;
    let subtotalItemsInCart = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        subtotalItemsInCart += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `₵${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = subtotalItemsInCart;
}

//remove item from cart
function removeItemFromCart(id) {

    // Remove item from cart array
    cart = cart.filter((item) => item.id !== id);

    // Find the product card on the shop page
    const card = document.querySelector(`[data-id="${id}"]`);

    if (card) {
        card.classList.remove("in-cart");

        const button = card.querySelector("button");

        if (button) {
            button.textContent = "ADD TO CART";
        }
    }

    updateCart();
}

function renderCartItemsList() {

    const cartTableBody = document.getElementById("cartTableBody");

    cartTableBody.innerHTML = "";

    cart.forEach((item, index) => {

        cartTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>₵${item.price}</td>

                <td>
                    <button onclick="ChangeNumberOfUnits('minus', '${item.id}')">-</button>
                    ${item.numberOfUnits}
                    <button onclick="ChangeNumberOfUnits('plus', '${item.id}')">+</button>
                </td>

                <td>
                    <button onclick="removeItemFromCart('${item.id}')">
                        Remove
                    </button>
                </td>
            </tr>
        `;

    });
}
// change Nuumber Of Units For an Item
function ChangeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if (item.id === id) {
            if (action === 'minus' && numberOfUnits > 1){
             numberOfUnits--;
            }else if (action === 'plus' && numberOfUnits < item.instock){
             numberOfUnits ++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}

const cartDiv = document.getElementById("cartdiv");
const cartModal = document.getElementById("cartModal");

if (cartDiv && cartModal) {
    cartDiv.onclick = function () {
        cartModal.style.display = "flex";
    };
}

const continueBtn = document.getElementById("continueBtn");

if (continueBtn && cartModal) {
    continueBtn.onclick = function () {
        cartModal.style.display = "none";
    };
}

updateCart();


// form validation
// checkoutForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let messages = [];
//     if (name.value.trim() === '' || name.value == null) {
//         messages.push('Name is required please!');
//     }

//     if (messages.length > 0) {
//             errorElement.innerText = messages.join(', ');
//             return;
//     }
//     console.log("Checkout form submitted");
// })


if (checkoutForm) {

    checkoutForm.addEventListener("submit", (e) => {

        e.preventDefault();

        let messages = [];

        if (name.value === "" || name.value == null) {
            messages.push("Name is required please!");
        }

        if (messages.length > 0) {
            errorElement.innerText = messages.join(", ");
            return;
        }

        console.log("VALIDATION PASSED");

        // Later:
        // Paystack code goes here

    });

}






































    
// function renderSubTotal() {
//     let totalPrice = 0;

//     cart.forEach((item) => {
//         totalPrice += item.price * item.numberOfUnits;
//     });

//     totalItems.textContent = cart.length;

//     totalPriceElement.textContent = `₵${totalPrice}`;
// }










/*
//CART ARRAY
let cart = [];

//ADD TO CART
function addToCart(id) {
    //check if product already exists in cart
    if(cart.some((item) => item.id === id)) {
        alert("Product already exists in cart!");
    }else{
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    updateCart();
}
*/



//RENDER PRODUCTS
// function renderProducts(){
//     products.forEach( (product) => {
//         myProduct.innerHTML += `
//             <div class="sub-div" data-id ="${product.id}">
//                 <div class="product-info">
//                     <img src="${product.imgSrc}" alt="">
//                     <P>${product.name}</P>
//                     <div class="price-tag">
//                     <p class="price-title">PRICE</p>
//                     <p class="price-value">₵${product.price}</p>
//                     </div>
//                 </div>
//             <button onclick="addToCart('${product.id}')">ADD TO CART</button>
//             </div>
//         `
//     })
// }
// renderProducts();
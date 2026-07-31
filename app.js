//SELECT ELEMENTS
const myProduct = document.querySelector(".gadgets");

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


////////////////////TRIAL/////////////////////
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
///////////////////////////////////////


function addToCart(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    card.classList.toggle("in-cart");

    const button = card.querySelector("button");
    const priceTag = card.querySelector(".price-tag");

    if (card.classList.contains("in-cart")) {
        button.textContent = "REMOVE FROM CART";
        // priceTag.style.display = "block";
    } else {
        button.textContent = "ADD TO CART";
        // priceTag.style.display = "none";
    }
}

    
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
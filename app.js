//SELECT ELEMENTS
const myProduct = document.querySelector(".gadgets");

//RENDER PRODUCTS
function renderProducts(){
    products.forEach( (product) => {
        myProduct.innerHTML += `
            <div class="sub-div">
                <img src="${product.imgSrc}" alt="">
                <P>${product.name}</P>
                <button>ADD TO CART</button>
            </div>
        `
    })
}
renderProducts();


















































// //SELECT ELEMENTS
// const myProducts = document.querySelector(".gadgets");

// //RENDER PRODUCTS
// function renderProducts() {
//     products.forEach( (product) => {
//         myProducts.innerHTML += `
//             <div class="sub-div">
//                 <img src="${product.imgSrc}" alt="">
//                 <P>${product.name}</P>
//                 <button>ADD TO CART</button>
//             </div>
//         `
//     })
// }
// renderProducts();
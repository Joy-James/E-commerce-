document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            for (let i = 0; i < response.length; i++) {
                let description = response[i].description;
                let title = response[i].title;
                products.innerHTML += `
       <div class="product">
           <img src="${response[i].image}" alt="${
          response[i].category.name
        }" class="product-img">
           <div class="product-content">
           <h2 class="product-title">${
             title.length > 18 ? title.substring(0, 18).concat(' ...') : title
           }</h2>
           <h4 class="product-category">${response[i].category}</h4>
           <p class="product-description">${
             description.length > 30
               ? description.substring(0, 30).concat(' ...more')
               : description
           }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a href="#!" data-productId="${
                 response[i].id
               }" class="add-to-cart"><ion-icon name="cart-outline">$${response[i]}</ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchProducts('https://fakestoreapi.com/products');
});
async function createCategories(categories){
    const navBar = document.querySelector(".navbar");
    const navbar_list = document.createElement("ul");
    categories.map(category=> {
          let navbar_list_item = document.createElement("li")
          navbar_list_item.innerText = category
          navbar_list_item.addEventListener("click", async()=>{
                let products = await getSpecificCategory(category)
                displayProducts(products, container)
               
          })
          navbar_list.appendChild(navbar_list_item)
    })

    navBar.appendChild(navbar_list);

}

let cart = JSON.parse(localStorage.getItem("cart"))
function setCounter(){
      let counter = document.querySelector(".counter")
      cart?.length? (counter.innerText = cart.length):(counter.innerText = 0)
      
}

setCounter()

// cart implementation

function addToCart(id){
      cart = JSON.parse(localStorage.getItem("cart"))
      let ifExists = cart?.find(product=>product.id===id)
      if (cart?.length) {
            if(ifExists){
                  let index = cart.findIndex(i => i.id === id)
                  let removedcart = cart.splice(index, 1);
                  
                  removedcart[0].quantity +=1;
                  cart.push(...removedcart)
                  localStorage.setItem("cart", JSON.stringify(cart))
                  setCounter()
            }else{
                  console.log("first")
                  cart.push({
                        id:id,
                        quantity:1
                  })
                  localStorage.setItem("cart", JSON.stringify(cart))
                  setCounter()
            }
      }else{
            let cart = []
            cart.push({
                  id:id,
                  quantity:1
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            setCounter()
      }
      
}
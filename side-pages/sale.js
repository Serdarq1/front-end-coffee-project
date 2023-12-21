let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let itemDescription = document.querySelector(".item-description")
let productDiv = document.querySelector(".products-menu-header-div")

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;    
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

function addDataToHTML(){
    // html sayfasını sil
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = ""



    if(products != null) // data varsa
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.innerHTML = `
            <div class="listProduct">
                <div class="text-center justify-content-center d-flex flex-column align-items-center text">
                </div>
                <div class="item">
                    <div class="card shadow-sm">
                        <img src="${product.image}" class="menu-item-img">
                      <div class="card-body">
                        <p class=" text-center fw-bold fs-6">${product.name}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="line"></div>          
            `
            listProductHTML.appendChild(newProduct);


            newProduct.addEventListener("click", function(){
                if(itemDescription.style.left == '-100%'){
                    itemDescription.style.left = '0';
                    container.style.transform = 'translateX(400px)';
                    productDiv.style.display = "none"
                    
                }else{
                    itemDescription.style.left = '-100%';
                    container.style.transform = 'translateX(0)';
                    productDiv.style.display = "flex"
                }


                itemDescription.innerHTML = ""
                let itemLeftSection = document.createElement("div")
                itemLeftSection.innerHTML = 
                `
                <h2 class="text-center fs-1 fw-bold" style="margin-top: 30%"> ${product.name} </h2>
    
            <div class="listCart d-flex flex-column text-center justify-content-center">
    
                <div class="item mb-4 mt-4">
                    <img src="../images/${product.image}" class="w-75">
                    <div class="content mt-2">
                        <div class="name text-center text-secondary fs-6">${product.description}</div>
                    </div>
                </div>
    
    
            </div>
    
            <div class="buttons d-flex justify-content-center align-items-center container">
                <div class="close-left btn rounded-0 fw-bold w-50 border-success me-2" onMouseOver="this.style.backgroundColor='green'" onMouseEnter="this.style.color='white'" onMouseOut="this.style.backgroundColor='white'" onMouseLeave="this.style.color='black'" style="cursor:pointer">CLOSE</div>
                <div class="rounded-0 btn fw-bold w-50 border-success" onclick="addCart(${product.id})" onMouseOver="this.style.backgroundColor='green'" onMouseEnter="this.style.color='white'" onMouseOut="this.style.backgroundColor='white'" onMouseLeave="this.style.color='black'" style="cursor:pointer">ADD TO CART</div>
            </div>`

                itemDescription.appendChild(itemLeftSection)

                let closeLeft = document.querySelector(".close-left")


                closeLeft.addEventListener('click', function (){
                    itemDescription.style.left = '-100%';
                    container.style.transform = 'translateX(0)';
                        productDiv.style.display = "flex"
                })
            })

        });
        
    }
}

//cookie kullanma yöntemi



let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    // html sayfasını sil
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // sepette ürün varsa
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.classList.add("item-shopping-cart")
                newCart.innerHTML = 
                    `<img src="${product.image}" class="">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / per product</div>
                    </div>
                    <div class="quantity">
                        <button class="px-1 py-2" onclick="changeQuantity(${product.id}, '-' )">-</button>
                        <span class="value bg-light " style="padding: 7px 8px; border-left:none; border-right:none; border-top:1px solid rgb(183,183,183); border-bottom:1px solid rgb(183,183,183);">${product.quantity}</span>
                        <button class="px-1 py-2" onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>
                    `
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // 0 dan küçükse ürün sil
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // cookie kaydet
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML();
}
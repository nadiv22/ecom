//card open close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};
//making add to cart
//cart workin js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded",ready);

}else {
    ready();
}

//making function
function ready() {
    //remove item from card
    var removeCardButtons = document.getElementsByClassName("cart-remove");
    for (var i =0; i< removeCardButtons.length; i++) {
        var button = removeCardButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    //quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i =0; i< quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    loadCartItem();
}
//remove cart item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}
//quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <=0) {
        input.value=1;
    }
    updatetotal();
    saveCartItems();
}

  //add cart function
  function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
    saveCartItems();
    updateCartIcon();
  }
    function addProductToCart(title,price,productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems= document.getElementsByClassName("cart-content")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i=0; i<cartItemsNames.length; i++) {
            if(cartItemsNames[i].innerText==title) {
                alert("you have already add this item to cart");
                return;
            }
        }
         var cartBoxContent = ` 
          <img src="${productImg}" alt="" class="cart-img" />
          <div class="detail-box">
             <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
              <input type="number" name="" id="" value="1" class="cart-quantity"/>
          </div>
          <!--remove item-->
          <i class="bx bxs-trash-alt cart-remove"></i>`;
     
        cartShopBox.innerHTML = cartBoxContent;
         cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click',removeCartItem);
         cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener('change',quantityChanged);
        saveCartItems(); 
        updateCartIcon();
    }
    
     
     
    
//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total=0;
    for (var i=0; i<cartBoxes.length;i++) {
        var cartBox = cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total +=price * quantity;

        }
           //if price in decimal form
           total=   Math.round(total *100) /100;  
           document.getElementsByClassName("total-price")[0].innerText = "$" + total;
           //save total to localstroage
           localStorage.setItem('cartTotal',total);
    }
    //keepm item in cart when page refresh
    function saveCartItems () {
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var cartItems = [];

        for (var i=0;i< cartBoxes.length;i++) {
            cartBox=cartBoxes[i];
            var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
            var priceElement= cart.getElementsByClassName('cart-price')[0];
            var quantityElement=cartBox.getElementsByClassName('cart-quantity')[0];
            var productImg=cartBox.getElementsByClassName('cart-img')[0].src;

            var item = { 
                title:titleElement.innerText,
                price:priceElement.innerText,
                quantity:quantityElement.value,
                productImg:productImg,
            };
            cartItems.push(item);

        }
        localStorage.setItem('cartItem',JSON.stringify(cartItems));
    }
//loads  in cards
function loadCartItem () {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItem);

        for  (var i =0; i < cartItems.length;i++) {
            var item = cartItems[i];
            addProductToCart(item.title,item.price,item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;

        }
    }
    var cartTotal = localStorage.getItem('carttotal');
    if(cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = 
        "$" + cartTotal;
    }
    updateCartIcon();
}

//quantity in card item
function updateCartIcon () {
     var cartBoxes = document.getElementsByClassName('cart-box');
     var quantity=0;
     for(var i =0;i<cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity +=parseInt(quantityElement.value);
     }
     var cartIcon = document.querySelector("#cart-icon");
     cartIcon.setAttribute("data-quantity",quantity);
}
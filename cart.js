var cartItems = JSON.parse(localStorage.getItem("cartData")) || [];
var total = 0;

document.addEventListener("DOMContentLoaded" , loadCart);

function addToCart(gameName, gamePrice) {
    cartItems.push({ name: gameName , price: gamePrice });
    localStorage.setItem("cartData" , JSON.stringify(cartItems));
    rendercart();
}

function rendercart(){
    var cartList = document.getElementById("cart-list");
    var emptymsg = document.getElementById("empty-message");
    var totalDisplay = document.getElementById("total-price");
    cartList.innerHTML = "";
    total = 0;

    if(cartItems.length === 0){
        emptymsg.style.display = "block";
        totalDisplay.innerText = "$0";
    }
    else{
        emptymsg.style.display = "none";
        cartItems.forEach(function(item) {
            total += item.price;

            var newItem = document.createElement("li");
            var nameText = document.createTextNode(item.name);
            var priceTag = document.createElement("span");
            
            priceTag.innerText = " $" + item.price;
            newItem.appendChild(nameText);
            newItem.appendChild(priceTag);
            cartList.appendChild(newItem);
        });
        totalDisplay.innerText = "$" + total.toFixed(2);
    }

}

function  loadCart(){
    rendercart();
}

/// clear cart button
function clearCart() {
    cartItems = [];
    localStorage.removeItem("cartData");
    rendercart();
}
/// buy $ add to library button
function checkout(){
    var cart = JSON.parse(localStorage.getItem("cartData")) || [];

    if(cart.length === 0){
        alert("your cart is empty! go buy some games first.");
        return;
    }
    var library = JSON.parse(localStorage.getItem("libraryData")) || [];
    var newLibrary = library.concat(cart);
    localStorage.setItem("libraryData" , JSON.stringify("newLibrary"));
    localStorage.removeItem("cartData");
    alert("your games are now in your library!");
    window.location.href = "my_library.html";
}


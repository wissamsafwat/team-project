// 1. Load memory when the page starts
var cartItems = JSON.parse(localStorage.getItem("cartData")) || [];
var total = 0;

document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    rendercart();
}

// 2. The function that builds the screen and does the math
function rendercart() {
    var cartList = document.getElementById("cart-list");
    var emptymsg = document.getElementById("empty-message");
    var totalDisplay = document.getElementById("total-price");

    // Clear the screen and reset total before counting
    cartList.innerHTML = "";
    total = 0;

    // Refresh memory just to be safe
    cartItems = JSON.parse(localStorage.getItem("cartData")) || [];

    if (cartItems.length === 0) {
        emptymsg.style.display = "block";
        totalDisplay.innerText = "$0.00";
    } else {
        emptymsg.style.display = "none";

        // Loop through each game in the cart
        cartItems.forEach(function(item, index) {
            

            var priceString = String(item.price).replace('$', '');
            var cleanPrice = parseFloat(priceString);

            // Add to total
            if (!isNaN(cleanPrice)) {
                total += cleanPrice;
            }


            // Create the HTML elements
            var newItem = document.createElement("li");
            var nameText = document.createTextNode(item.name);
            var priceTag = document.createElement("span");
            
            
            priceTag.innerText = " $" + cleanPrice.toFixed(2);
            priceTag.style.color = "#ff3333"; 

            // Create a remove button for the item
            var removeBtn = document.createElement("button");
            removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            removeBtn.style.width = "auto";
            removeBtn.style.marginLeft = "15px";
            removeBtn.style.padding = "5px 10px";
            removeBtn.onclick = function() { removeFromCart(index); };

            // Put it all together
            newItem.appendChild(nameText);
            newItem.appendChild(priceTag);
            newItem.appendChild(removeBtn);
            cartList.appendChild(newItem);
        });

        // Update the big total at the bottom
        totalDisplay.innerText = "$" + total.toFixed(2);
    }
}

// 3. Remove a single item
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartData", JSON.stringify(cartItems));
    rendercart();
}
// 4. Clear the whole cart
function clearCart() {
    cartItems = [];
    localStorage.removeItem("cartData");
    rendercart();
}

// 5. Checkout and go to Library
function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    var currentLibrary = JSON.parse(localStorage.getItem('libraryData')) || [];
    var updatedLibrary = currentLibrary.concat(cartItems);
    
    localStorage.setItem('libraryData', JSON.stringify(updatedLibrary));
    localStorage.removeItem('cartData');

    alert("Purchase successful! Adding to your library...");
    window.location.href = "my_library.html";
}

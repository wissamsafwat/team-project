window.onload = function() {
    const storeContainer = document.querySelector('.card-container');
    const libraryItems = JSON.parse(localStorage.getItem('libraryData')) || []; 
    
    if (storeContainer) {
        storeContainer.innerHTML = ""; 

        gamesDatabase.forEach(game => {
            const card = document.createElement('div');
            card.className = "card";
            card.id = game.id;

            const alreadyOwned = libraryItems.find(item => item.id === game.id);
            
            let buttonHTML = '';
            if (alreadyOwned) {
                // Gray, unclickable button
                buttonHTML = `
                    <button class="add_to_cart" style="background-color: #222; color: #888; border-color: #444; cursor: not-allowed;" disabled>
                        <i class="fa-solid fa-check"></i> In Library
                    </button>
                `;
            } else {
                // Normal functional button
                buttonHTML = `
                    <button class="add_to_cart" onclick="addToCart('${game.id}')">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                `;
            }

            card.innerHTML = `
                <img src="${game.image}" alt="${game.name}" class="card-img">
                <span class="card_details">
                    <p class="card-title">${game.name}</p>
                    <p class="info">${game.info}</p>
                    <p class="card-price">${game.price.startsWith('$') ? game.price : '$' + game.price}</p>
                </span>
                ${buttonHTML} 
            `;
            
            storeContainer.appendChild(card);
        });
    }

    const search_input = document.getElementById('search');
    
    if (search_input) {
        search_input.addEventListener('keyup', function() {
            const filter = search_input.value.toLowerCase();
            const cards = document.querySelectorAll('.card'); 
            
            cards.forEach(card => {

                const game_name = card.querySelector('.card-title').textContent.toLowerCase(); 
                if (game_name.includes(filter)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
};

function addToCart(gameId) {
    const exactGame = gamesDatabase.find(g => g.id === gameId);
    
    if (!exactGame) return;

    let cartItems = JSON.parse(localStorage.getItem('cartData')) || [];
    const alreadyInCart = cartItems.find(item => item.id === gameId);
    
    if (alreadyInCart) {
        alert(`${exactGame.name} is already in your cart!`);
    } else {
        cartItems.push(exactGame);
        localStorage.setItem('cartData', JSON.stringify(cartItems));
        alert(`${exactGame.name} added to cart!`);
    }
}
/// list and grid views
function setGridView() {
    document.querySelector('.card-container').classList.remove('list-view');
}

function setListView() {
    document.querySelector('.card-container').classList.add('list-view');
}
const search_input = document.getElementById('search');
const fav_container = document.querySelector('.fav_cards_container');
const game_container = document.querySelector('.cards_container');

window.onload = function() {
    const rawData = localStorage.getItem('libraryData');
    const rawFavs = localStorage.getItem('fav_list');

    const boughtGames = JSON.parse(rawData) || [];
    const savedFavs = JSON.parse(rawFavs) || [];

    // Clear everything
    game_container.innerHTML = "";
    fav_container.innerHTML = "";

    if (boughtGames.length === 0) {
        game_container.innerHTML = "<p style='color:gray; padding:20px;'>You haven't bought any games yet!</p>";
        return; // Stop here if no games
    }

    boughtGames.forEach(game => {
        const card = document.createElement('div');
        card.className = "card";
        card.id = game.id;
       
        card.innerHTML = `
            <img src="${game.image}" alt="img" class="card-img">
            <span class="card_details">
                <p class="card_name">${game.name}</p>
                <p class="info">${game.info}</p>
            </span>
            <button class="add_to_fav">
                <i class="fa-solid fa-heart"></i>
            </button>
        `;
        

        if (savedFavs.includes(card.id)) {
            fav_container.appendChild(card);
            card.querySelector('.add_to_fav').style.color = "tomato";
        } else {
            game_container.appendChild(card);
        }
    });

    addToFav();
}

// the add to favourite logic 
function addToFav(){
    const fav_buttons = document.querySelectorAll('.add_to_fav');
    fav_buttons.forEach(button => {
    button.addEventListener('click', function() {
        const card = button.closest('.card');
        if (card.parentElement === fav_container){
            game_container.appendChild(card);
            button.style.color = "#1a1a1a";
        }
        else {
            fav_container.appendChild(card);
            button.style.color = "tomato";
        }
        save();
    });
}); 
}


// the saving function 
function save(){
    const favourites = [];
    fav_container.querySelectorAll('.card').forEach(card => {
        favourites.push(card.id);
    });
    localStorage.setItem('fav_list' , JSON.stringify(favourites));
}

//search bar 
search_input.addEventListener('keyup' , function() {
    const filter = search_input.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const game_name = card.querySelector('.card_name').textContent.toLowerCase();
        if (game_name.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
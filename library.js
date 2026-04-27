//search bar 
const search_input = document.getElementById('search');
const cards = document.querySelectorAll('.card');

search_input.addEventListener('keyup' , function() {
    const filter = search_input.value.toLowerCase();
    cards.forEach(card => {
        const game_name = card.querySelector('.card_details p').textContent.toLowerCase();
        if (game_name.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
// add to favourite button 
const fav_container = document.querySelector('.fav_cards_container');
const game_container = document.querySelector('.cards_container');
const fav_buttons = document.querySelectorAll('.add_to_fav');
// the saving function 
function save(){
    const favourites = [];
    fav_container.querySelectorAll('.card').forEach(card => {
        favourites.push(card.id);
    });
    localStorage.setItem('fav_list' , JSON.stringify(favourites));
}
// function to load the saved data 
window.onload = function() {
    const saved_favs = JSON.parse(localStorage.getItem('fav_list')) || [];
    saved_favs.forEach(game_id => {
        const card = document.getElementById(game_id);
        if(card){
            fav_container.appendChild(card);
            card.querySelector('.add_to_fav').style.color = "tomato";
        } 
    });
};
// the add to favourite logic 
fav_buttons.forEach(button => {
    button.addEventListener('click', function() {
        const card = button.closest('.card');
        if (card.parentElement == fav_container){
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

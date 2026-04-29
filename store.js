//search bar 
const search_input = document.getElementById('search');
const cards = document.querySelectorAll('.card');

search_input.addEventListener('keyup' , function() {
    const filter = search_input.value.toLowerCase();
    cards.forEach(card => {
        const game_name = card.querySelector('.card-title').textContent.toLowerCase();
        if (game_name.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
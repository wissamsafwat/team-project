// دالة السيرش والقايمة
function setupSearch(inputId, resultsId, columnNumber) {
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);

    if(!input || !resultsContainer) return;

    input.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        resultsContainer.innerHTML = ''; 

        if (query.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }

        // فلترة الألعاب على اللي بتكتبه
        const matches = gamesDatabase.filter(game => game.name.toLowerCase().includes(query));

        if (matches.length > 0) {
            resultsContainer.style.display = 'block';
            matches.forEach(game => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.textContent = game.name;
                
                // لما تضغط على اللعبة من القايمة
                item.addEventListener('click', () => {
                    fillData(game, columnNumber); // املأ الجدول والصورة
                    input.value = game.name; // حط الاسم في السيرش
                    resultsContainer.style.display = 'none'; // اقفل القايمة
                });
                resultsContainer.appendChild(item);
            });
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // اقفل القايمة لو دوست في أي مكان فاضي في الصفحة
    document.addEventListener('click', function(e) {
        if (e.target !== input && e.target !== resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    });
}

// دالة رمي البيانات في الجدول والصورة
function fillData(game, col) {
    // إظهار الصورة
    const imgEl = document.getElementById(`img-game-${col}`);
    if(imgEl) {
        imgEl.src = game.image;
        imgEl.style.display = 'block'; 
    }

    // إملاء خانات الجدول
    document.getElementById(`price-game-${col}`).textContent = game.price;
    document.getElementById(`rating-game-${col}`).textContent = game.rating;
    document.getElementById(`req-game-${col}`).textContent = game.req;
    document.getElementById(`storage-game-${col}`).textContent = game.storage;
}

// تشغيل السكربت على العمود الأول والتاني
setupSearch('search-game-1', 'results-1', 1);
setupSearch('search-game-2', 'results-2', 2);
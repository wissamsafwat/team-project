const gamesDatabase = [
    {
        name: "Spider-Man Miles Morales",
        image: "images/spiderman.logo.webp",
        price: "$39.99",
        rating: "9 / 10",
        req: "Core i5, 8GB RAM, GTX 1060",
        storage: "75 GB"
    },
    {
        name: "Call of Duty Warzone",
        image: "images/COD.logo.avif",
        price: "29.99",
        rating: "8.5 / 10",
        req: "Core i5, 12GB RAM, GTX 1650",
        storage: "125 GB"
    },
    {
        name: "EA Sports FC 26",
        image: "images/EA-SPORTS-FC.logo.jpg",
        price: "$59.99",
        rating: "8 / 10",
        req: "Core i7, 16GB RAM, RTX 2060",
        storage: "100 GB"
    },
    {
        name: "Forza Horizon 5",
        image: "images/ForzaHorizon5.logo.jpg",
        price: "$49.99",
        rating: "9.2 / 10",
        req: "Core i5, 8GB RAM, GTX 1070",
        storage: "110 GB"
    },
    {
        name: "God of War Ragnarok",
        image: "images/god of war.logo.avif",
        price: "$39.99",
        rating: "9.8 / 10",
        req: "Core i7, 16GB RAM, RTX 2070",
        storage: "90 GB"
    },
    {
        name: "GTA VI",
        image: "images/grand-theft-auto-vi.logo.avif",
        price: "$59.99",
        rating: "10 / 10",
        req: "Core i9, 32GB RAM, RTX 3080",
        storage: "150 GB"
    },
    {
        name: "Minecraft",
        image: "images/minecraft.logo.jpg",
        price: "$14.99",
        rating: "9.5 / 10",
        req: "Core i3, 4GB RAM, Integrated GPU",
        storage: "2 GB"
    },
    {
        name: "Need for Speed Heat",
        image: "images/nfs.logo.avif",
        price: "$29.99",
        rating: "8.2 / 10",
        req: "Core i5, 8GB RAM, GTX 1060",
        storage: "50 GB"
    },
    {
        name: "Rocket League",
        image: "images/rocket-league.logo.webp",
        price: "19.99",
        rating: "8.7 / 10",
        req: "Core i3, 4GB RAM, GTX 660",
        storage: "20 GB"
    }
];

// 2. دالة السيرش والقايمة
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

        // فلترة الألعاب بناءً على اللي بتكتبه
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

// 3. دالة رمي البيانات في الجدول والصورة
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

// 4. تشغيل السكربت على العمود الأول والتاني
setupSearch('search-game-1', 'results-1', 1);
setupSearch('search-game-2', 'results-2', 2);
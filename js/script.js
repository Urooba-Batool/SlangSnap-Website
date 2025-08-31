// fetching data from json file and displaying
fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('slangCardsContainer');
        let row = document.createElement('div');
        row.className = 'listcards d-flex my-5 flex-wrap';
        data.forEach((slang, idx) => {
            const card = document.createElement('div');
            card.className = 'card me-4 mb-4';
            card.style.width = '17rem';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${slang.title}</h5>
                    <h6 class="card-subtitle mb-2">
                        <span class="text-muted">Meaning: </span>
                        <span>${slang.meaning}</span>
                    </h6>
                    <a href="#" class="card-link">
                        <button class="btn card-link-btn">View Details</button>
                    </a>
                </div>
                `;
                row.appendChild(card);
                // 4 cards per row
                if ((idx + 1) % 4 === 0 || idx === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement('div');
                    row.className = 'listcards d-flex my-5 flex-wrap';
                }
            });
        })
        .catch(err => {
            document.getElementById('slangCardsContainer').innerHTML = '<p class="text-danger">Failed to load slangs.</p>';
        });

// Text-to-Speech functionality
        function speakWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US"; // Change to another language/voice if needed
        speechSynthesis.speak(utterance);
        }

// Sorting functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filterBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortSelect = document.getElementById('sortSelect');
    const slangCardsContainer = document.getElementById('slangCardsContainer');

    // Toggle dropdown visibility
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sortDropdown.style.display = sortDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!sortDropdown.contains(e.target) && e.target !== filterBtn) {
            sortDropdown.style.display = 'none';
        }
    });

    function sortCards(order) {
        // Get all cards
        const cards = Array.from(slangCardsContainer.querySelectorAll('.card'));
        // Sort cards
        cards.sort((a, b) => {
            const titleA = a.querySelector('.card-title')?.textContent.trim().toUpperCase() || '';
            const titleB = b.querySelector('.card-title')?.textContent.trim().toUpperCase() || '';
            if (order === 'asc') {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });

        // Remove all rows
        slangCardsContainer.innerHTML = '';

        // Re-create rows with 4 cards per row, keeping horizontal layout
        let row = document.createElement('div');
        row.className = 'listcards d-flex my-5 flex-wrap';
        cards.forEach((card, idx) => {
            row.appendChild(card);
            if ((idx + 1) % 4 === 0 || idx === cards.length - 1) {
                                slangCardsContainer.appendChild(row);
                                row = document.createElement('div');
                                row.className = 'listcards d-flex my-5 flex-wrap';
            }
        });
    }

    sortSelect.addEventListener('change', function() {
        sortCards(this.value);
    });

    // Initial sort
    sortCards(sortSelect.value);
});
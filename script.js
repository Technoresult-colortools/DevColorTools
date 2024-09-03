document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menuButton').addEventListener('click', function () {
        var mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
        var mobileMenu = document.getElementById('mobileMenu');
        if (!event.target.closest('#menuButton') && !event.target.closest('#mobileMenu')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

//function for browser more button

document.addEventListener('DOMContentLoaded', function() {
    const browseMoreBtn = document.getElementById('browseMoreBtn');
    const hiddenCards = document.querySelectorAll('#colorToolsGrid .hidden');

    browseMoreBtn.addEventListener('click', function() {
        hiddenCards.forEach(card => {
            card.classList.remove('hidden');
        });
        browseMoreBtn.classList.add('hidden'); // Hide the "Browse More" button after revealing the cards
    });
});



// function for search bar
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[type="text"]');
    const cards = document.querySelectorAll('.grid > div');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// for sidebar

function addAsideLink(href, iconClass, text, textColorClass, iconColorClass) {
    const asideList = document.querySelector("aside ul");
    
    const listItem = document.createElement("li");
    
    const link = document.createElement("a");
    link.href = href;
    link.className = `flex items-center ${textColorClass} hover:text-blue-500 transition-colors duration-200`;
    
    const icon = document.createElement("i");
    icon.className = `${iconClass} mr-3 ${iconColorClass}`;
    
    const span = document.createElement("span");
    span.textContent = text;
    
    link.appendChild(icon);
    link.appendChild(span);
    listItem.appendChild(link);
    
    asideList.appendChild(listItem);
}

// Example usage:
addAsideLink('ColorPaletteGenerator.html', 'fas fa-solid fa-brain', 'AI Color Palette Generator', 'text-gray-700', 'text-blue-500');

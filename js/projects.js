const btn = document.getElementById("langBtn");
const dropdown = document.getElementById("langDropdown");
const currentLang = document.getElementById("currentLang");
const items = document.querySelectorAll(".lang-item");

btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    btn.classList.toggle("active");
});

items.forEach(item => {
    item.addEventListener("click", () => {
        const lang = item.dataset.lang;

        currentLang.textContent = lang.toUpperCase();

        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        dropdown.classList.remove("show");
        btn.classList.remove("active");

        localStorage.setItem("lang", lang);
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang")) {
        dropdown.classList.remove("show");
    }
});

const saved = localStorage.getItem("lang");
if(saved){
    currentLang.textContent = saved.toUpperCase();
}

document.querySelectorAll(".ripple-btn").forEach(button => {

    const ripple = button.querySelector(".ripple");

    function moveRipple(e) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = e.clientX - rect.left - size/2 + "px";
        ripple.style.top = e.clientY - rect.top - size/2 + "px";
    }

    button.addEventListener("mouseenter", (e) => {
        moveRipple(e);
        ripple.classList.remove("leave");
        ripple.classList.add("enter");
    });

    button.addEventListener("mousemove", moveRipple);

    button.addEventListener("mouseleave", (e) => {
        moveRipple(e);
        ripple.classList.remove("enter");
        ripple.classList.add("leave");
    });
});

const hamburger = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("show");
    navMenu.classList.toggle("show");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("show");
    });
});

document.querySelectorAll(".project-tools").forEach(container => {
    const maxVisible = 5;
    const items = Array.from(container.querySelectorAll("img"));

    if (items.length > maxVisible) {
        const hiddenCount = items.length - maxVisible;

        items.slice(maxVisible).forEach(el => el.style.display = "none");

        let more = container.querySelector(".tools-more");
        if (!more) {
            more = document.createElement("span");
            more.className = "tools-more";
            container.appendChild(more);
        }
        more.textContent = `+${hiddenCount}`;
    }
});

const dropdownBtn = document.getElementById('selected-sort');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectedText = dropdownBtn.querySelector('.text');
const options = dropdownMenu.querySelectorAll('li');
const arrowIcon = dropdownBtn.querySelector('.arrow-icon'); 

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    arrowIcon.classList.toggle('rotate'); 
});

options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedText.innerText = option.getAttribute('data-value');
        
        dropdownMenu.classList.remove('show');
        arrowIcon.classList.remove('rotate');
        
        console.log("Sorting by:", option.getAttribute('data-value'));
    });
});

window.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        arrowIcon.classList.remove('rotate');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projects-list');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const tagButtons = document.querySelectorAll('.tag-btn');
    const dropdownItems = document.querySelectorAll('.dropdown-menu li');
    const selectedSortText = document.querySelector('#selected-sort .text');

    function updateTagCounts() {
        tagButtons.forEach(btn => {
            const tag = btn.getAttribute('data-tag');
            const countSpan = btn.querySelector('.count');
            if (!countSpan) return;

            if (tag === 'all') {
                countSpan.textContent = `(${cards.length})`;
            } else {
                const count = cards.filter(card => 
                    card.getAttribute('data-category').split(' ').includes(tag)
                ).length;
                countSpan.textContent = `(${count})`;
            }
        });
    }

    function filterAndSort() {
        const activeTag = document.querySelector('.tag-btn.active').getAttribute('data-tag');
        const sortValue = selectedSortText.textContent.trim();

        cards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            const isMatch = activeTag === 'all' || categories.includes(activeTag);
            
            if (isMatch) {
                card.style.display = 'grid'; // Gunakan grid/flex sesuai CSS asli Anda
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });

        const visibleCards = cards.filter(card => !card.classList.contains('hidden'));
        
        if (sortValue === "Oldest First") {
            // Urutan asli HTML (1 ke 8)
            visibleCards.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
        } else {
            // Urutan terbalik (8 ke 1)
            visibleCards.sort((a, b) => cards.indexOf(b) - cards.indexOf(a));
        }

        visibleCards.forEach(card => container.appendChild(card));
    }

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tagButtons.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            filterAndSort();
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            selectedSortText.textContent = item.textContent;
            filterAndSort();
        });
    });

    updateTagCounts();
    filterAndSort();
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projects-list');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const tagButtons = document.querySelectorAll('.tag-btn');
    const dropdownItems = document.querySelectorAll('.dropdown-menu li');
    const selectedSortText = document.querySelector('#selected-sort .text');
    const paginationContainer = document.getElementById('pagination');

    let currentPage = 1;
    const projectsPerPage = 5;

    function updateUI() {
        const activeTag = document.querySelector('.tag-btn.active').getAttribute('data-tag');
        const sortValue = selectedSortText.textContent.trim();

        let filteredCards = cards.filter(card => {
            const categories = card.getAttribute('data-category').split(' ');
            return activeTag === 'all' || categories.includes(activeTag);
        });

        if (sortValue === "Oldest First") {
            filteredCards.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
        } else {
            filteredCards.sort((a, b) => cards.indexOf(b) - cards.indexOf(a));
        }

        const totalPages = Math.ceil(filteredCards.length / projectsPerPage);
        if (currentPage > totalPages) currentPage = 1;

        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const cardsToDisplay = filteredCards.slice(startIndex, endIndex);

        container.innerHTML = "";
        cardsToDisplay.forEach(card => {
            card.style.display = 'grid'; 
            container.appendChild(card);
        });

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = "";
        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = `&lt; Prev`;
        prevBtn.classList.add('page-num', 'prev-next');
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateUI();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            pageBtn.classList.add('page-num');
            if (i === currentPage) pageBtn.classList.add('active');

            pageBtn.addEventListener('click', () => {
                currentPage = i;
                updateUI();
                scrollToTop();
            });
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = `Next &gt;`; // Simbol >
        nextBtn.classList.add('page-num', 'prev-next');
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateUI();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function scrollToTop() {
        const projectSection = document.getElementById('projects');
        window.scrollTo({
            top: projectSection.offsetTop - 50,
            behavior: 'smooth'
        });
    }

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tagButtons.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            currentPage = 1;
            updateUI();
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            selectedSortText.textContent = item.textContent;
            updateUI();
        });
    });

    updateUI();
});
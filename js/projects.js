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
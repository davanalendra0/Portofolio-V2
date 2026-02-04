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
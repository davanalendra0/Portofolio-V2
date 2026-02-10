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

const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\~";

document.querySelectorAll(".encrypt").forEach(el => {
    const original = el.textContent;
    let iteration = 0;

    const interval = setInterval(() => {
        el.textContent = original
            .split("")
            .map((char, index) => {
                if (char === " ") return " ";

                if (index < iteration) {
                    return original[index];
                }

                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= original.length) {
            clearInterval(interval);
        }

        iteration += 0.25;
    }, 30);
});

const cards = document.querySelectorAll(".hover-glow");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });
});

const circle = document.querySelector(".profile-circle");
const follow = document.querySelector(".follow-name");

circle.addEventListener("mouseenter", () => {
    follow.classList.add("show");
    follow.style.opacity = "1";
    follow.style.transform = "translate(-50%, -50%) scale(1)";
});

circle.addEventListener("mouseleave", () => {
    follow.classList.remove("show");
    follow.style.opacity = "0";
    follow.style.transform = "translate(-50%, -50%) scale(0.8)";
});

circle.addEventListener("mousemove", (e) => {
    const rect = circle.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = 60;
    const offsetY = 65;

    follow.style.left = x + offsetX + "px";
    follow.style.top = y + offsetY + "px";
});

document.querySelectorAll(".js-marquee").forEach(marquee => {
    const speed = 0.5; // kecil = lebih halus

    let scrollAmount = 0;
    let isPaused = false;

    marquee.addEventListener("mouseenter", () => isPaused = true);
    marquee.addEventListener("mouseleave", () => isPaused = false);

    function animate() {
        if (!isPaused) {
            scrollAmount += speed;
            marquee.scrollLeft = scrollAmount;

            if (scrollAmount >= marquee.scrollWidth / 2) {
            scrollAmount = 0;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});

const modal = document.getElementById("certModal");
const header = document.getElementById("mainHeader");

document.querySelectorAll(".cert-card").forEach(card => {
    card.addEventListener("click", () => {

        document.getElementById("detailImg").src = card.dataset.image;
        document.getElementById("detailTitle").textContent = card.dataset.title;
        document.getElementById("detailIssuer").textContent = card.dataset.issuer;
        document.getElementById("detailIssued").textContent = card.dataset.issued;
        document.getElementById("detailExpire").textContent = card.dataset.expire;
        document.getElementById("detailCredential").textContent = card.dataset.credential;
        document.getElementById("detailDesc").textContent = card.dataset.description;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        if (header) header.style.display = "none";
    });
});

function closeModal(){
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    if (header) header.style.display = "";
}

document.querySelector(".cert-close").onclick = closeModal;
document.querySelector(".cert-overlay").onclick = closeModal;

document.addEventListener("keydown", e => {
    if(e.key === "Escape") closeModal();
});
const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isIntroFinished = false;
let isAnimationComplete = false;

window.addEventListener('load', () => {
    // Temps d'atterrissage de l'enveloppe
    setTimeout(() => { header.style.opacity = "1"; isIntroFinished = true; }, 3100);
});

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;
    header.style.opacity = "0";
    env.classList.add("is-active", "is-opened");
    setTimeout(() => { card.classList.add("is-visible"); }, 600);
    setTimeout(() => { isAnimationComplete = true; }, 1700);
});

window.addEventListener("scroll", () => {
    if (!isAnimationComplete) {
        if(window.scrollY > 0) window.scrollTo(0,0);
        return;
    }
    
    const scrollY = window.scrollY;
    
    // Seuil de centrage (0 à 400px de scroll)
    if (scrollY > 20 && scrollY < 400) {
        card.classList.add("is-centered");
        card.classList.remove("is-full");
    } 
    // Seuil d'expansion (au-delà de 400px)
    else if (scrollY >= 400) {
        card.classList.add("is-full");
    } 
    // Retour à l'état initial
    else {
        card.classList.remove("is-centered", "is-full");
    }
});
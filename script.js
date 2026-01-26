const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isIntroFinished = false;
let isAnimationComplete = false;
let hasCentered = false;

window.addEventListener('load', () => {
    // Délai correspondant à l'animation d'entrée CSS
    setTimeout(() => {
        header.style.opacity = "1";
        isIntroFinished = true;
    }, 3100);
});

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;
    
    header.style.opacity = "0";
    env.classList.add("is-active", "is-opened");
    
    // Sortie de la carte
    setTimeout(() => { 
        card.classList.add("is-visible"); 
    }, 600);
    
    // Autorisation du scroll après l'animation
    setTimeout(() => { 
        isAnimationComplete = true; 
    }, 1700);
});

window.addEventListener("scroll", () => {
    // Empêche le scroll avant l'ouverture
    if (!isAnimationComplete) {
        if(window.scrollY > 0) window.scrollTo(0,0);
        return;
    }
    
    // Centrage de la carte au premier mouvement
    if (window.scrollY > 15 && !hasCentered) {
        hasCentered = true;
        card.classList.add("is-centered");
    } else if (window.scrollY < 10 && hasCentered) {
        hasCentered = false;
        card.classList.remove("is-centered");
    }
});
const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isIntroFinished = false;
let isAnimationComplete = false;

window.addEventListener('load', () => {
    // On attend la fin de l'animation CSS (2.4s + 0.5s) avant de montrer le texte
    setTimeout(() => {
        header.style.opacity = "1";
        isIntroFinished = true;
    }, 3100);
});

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;

    header.style.opacity = "0";
    env.classList.add("is-active"); 
    env.classList.add("is-opened");

    setTimeout(() => {
        card.classList.add("is-visible");
    }, 600);

    setTimeout(() => {
        isAnimationComplete = true;
        card.classList.add("no-transition");
    }, 1700);
});

window.addEventListener("scroll", () => {
    if (!isAnimationComplete) {
        if(window.scrollY > 0) window.scrollTo(0,0);
        return;
    }
    
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const maxScroll = document.body.scrollHeight - vh;
    const progress = scrollY / maxScroll;
    
    // Déplacement fluide au scroll
    const moveY = -15 - (progress * 1500); 
    card.style.transform = `translateY(${moveY}px) translateZ(2px)`;
});
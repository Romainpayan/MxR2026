const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isIntroFinished = false;
let isAnimationComplete = false;

// SÉQUENCE D'INTRODUCTION
window.addEventListener('load', () => {
    // On attend 3.1 secondes avant d'afficher le texte noir
    setTimeout(() => {
        header.style.opacity = "1";
        isIntroFinished = true;
    }, 3100);
});


// SÉQUENCE AU CLIC
env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;

    // 1. DÉZOOME VIF (0.5s)
    env.classList.add("is-active");
    header.style.opacity = "0";

    // 2. OUVERTURE (Démarre à 0.5s)
    setTimeout(() => {
        env.classList.add("is-opened");
    }, 500);

    // 3. REBOND DE LA CARTE (Délai total 1.2s)
    setTimeout(() => {
        card.classList.add("is-visible");
        isAnimationComplete = true;
    }, 1200);
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
    
    card.style.transform = `translateY(calc(-20px - ${progress * 150}%))`;
});
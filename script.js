const env = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const welcomeScreen = document.getElementById("welcomeScreen");
const flashOverlay = document.getElementById("flashOverlay");

let isIntroFinished = false;
let cardState = 'hidden'; 

window.addEventListener('load', () => { createFloatingAura(); });

welcomeScreen.addEventListener("click", () => {
    welcomeScreen.classList.add("is-hidden");
    env.classList.add("is-animating");
    env.style.opacity = "1";
    setTimeout(() => {
        env.classList.remove("is-animating");
        waxSeal.classList.add("is-glowing");
        isIntroFinished = true;
    }, 2400); 
});

function createFloatingAura() {
    const container = document.getElementById("floatingParticles");
    for (let i = 0; i < 150; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        const radius = Math.random() * 10 + 40; 
        const duration = Math.random() * 10 + 10; 
        const startAngle = Math.random() * 360;
        const maxOp = Math.random() * 0.6 + 0.2; 
        const size = Math.random() < 0.5 ? 1 : 2; 
        p.style.width = size + 'px'; p.style.height = size + 'px';
        p.style.setProperty('--radius', radius + 'px');
        p.style.setProperty('--duration', duration + 's');
        p.style.setProperty('--start-angle', startAngle + 'deg');
        p.style.setProperty('--max-op', maxOp);
        container.appendChild(p);
    }
}

env.addEventListener("click", () => {
    if (!isIntroFinished || cardState !== 'hidden') return;
    waxSeal.classList.remove("is-glowing");
    waxSeal.classList.add("is-broken");
    setTimeout(() => {
        flashOverlay.classList.add("is-flashing");
        waxSeal.classList.add("is-separating");
    }, 400);
    setTimeout(() => {
        env.classList.add("is-active", "is-opened");
        setTimeout(() => {
            card.classList.add("is-visible");
            cardState = 'peek';
        }, 800);
    }, 1000); 
});

// Déploiement au scroll ou swipe
const handleInteraction = () => {
    if (cardState === 'peek') {
        card.classList.add("is-deployed");
        cardState = 'deployed';
        // Le contenu est déjà aligné en haut via CSS (flex-start)
        // On remet le scroll à zéro au cas où
        cardInner.scrollTop = 0;
    }
};

window.addEventListener("wheel", handleInteraction);
window.addEventListener("touchmove", handleInteraction);

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) window.scrollTo(0,0);
});

const introTop = document.getElementById("introTop");
const introBottom = document.getElementById("introBottom");
const env = document.getElementById("envelope");
const card = document.getElementById("card");
const waxSeal = document.getElementById("waxSeal");
const floatingContainer = document.getElementById("floatingParticles");
const flashOverlay = document.getElementById("flashOverlay");

let isIntroFinished = false;
let isAnimationComplete = false;

// Textes à écrire
const textTopContent = "Vous avez reçu\nune Invitation";
const textBottomContent = "Ouvrez le Sceau";

window.addEventListener('load', () => {
    createFloatingAura();
    setTimeout(async () => {
        // Écriture de la première phrase
        await typeEffect(introTop, textTopContent, 30);
        
        // PAUSE DRAMATIQUE (1.2 seconde)
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Écriture de la deuxième phrase
        await typeEffect(introBottom, textBottomContent, 35);
        
        waxSeal.classList.add("is-glowing");
        isIntroFinished = true;
    }, 3100);
});

async function typeEffect(element, text, speed) {
    element.innerHTML = "";
    element.style.opacity = "1";
    
    for (let char of text) {
        if (char === "\n") {
            element.innerHTML += "<br>";
        } else {
            element.innerHTML += char;
        }
        await new Promise(resolve => setTimeout(resolve, speed + Math.random() * 20));
    }
}

function createFloatingAura() {
    const count = 60;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        p.style.width = '1px'; p.style.height = '1px';
        const radius = Math.random() * 12 + 38;
        const duration = Math.random() * 10 + 15;
        const startAngle = Math.random() * 360;
        const maxOp = Math.random() * 0.5 + 0.2;
        p.style.setProperty('--radius', radius + 'px');
        p.style.setProperty('--duration', duration + 's');
        p.style.setProperty('--start-angle', startAngle + 'deg');
        p.style.setProperty('--max-op', maxOp);
        floatingContainer.appendChild(p);
    }
}

function createSpiralBurst() {
    const count = 0; // Tes modifs : pas d'explosion de particules
    const spawnRadius = 35; 
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.width = '1px'; p.style.height = '1px';
        const startAngle = Math.random() * 360;
        const dist = Math.random() * 120 + 100;
        const rot = (Math.random() * 360 + 180) * (Math.random() > 0.5 ? 1 : -1);
        p.style.setProperty('--start-angle', startAngle + 'deg');
        p.style.setProperty('--spawn-radius', spawnRadius + 'px');
        p.style.setProperty('--dist', dist + 'px');
        p.style.setProperty('--rot', rot + 'deg');
        waxSeal.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;
    
    waxSeal.classList.add("is-broken");
    introTop.style.opacity = "0";
    introBottom.style.opacity = "0";

    setTimeout(() => {
        flashOverlay.classList.add("is-flashing");
        waxSeal.classList.add("is-separating");
        createSpiralBurst();
    }, 400);
    
    setTimeout(() => {
        env.classList.add("is-active", "is-opened");
        setTimeout(() => { card.classList.add("is-visible"); }, 800);
        setTimeout(() => { isAnimationComplete = true; }, 1900);
    }, 1000); 
});

window.addEventListener("scroll", () => {
    if (!isAnimationComplete && window.scrollY > 0) window.scrollTo(0,0);
});

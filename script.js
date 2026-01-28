const introTop = document.getElementById("introTop");
const introBottom = document.getElementById("introBottom");
const env = document.getElementById("envelope");
const card = document.getElementById("card");
const waxSeal = document.getElementById("waxSeal");
const floatingContainer = document.getElementById("floatingParticles");
const flashOverlay = document.getElementById("flashOverlay");

let isIntroFinished = false;
let isAnimationComplete = false;

window.addEventListener('load', () => {
    createFloatingAura();
    
    // Déclenchement séquentiel précis
    setTimeout(() => {
        // 1. Faire apparaître la première phrase plus vite (2.8s)
        introTop.classList.add("is-visible");
        
        setTimeout(() => {
            // 2. Faire apparaître la seconde phrase AVANT le glow
            introBottom.classList.add("is-visible");
            
            setTimeout(() => {
                // 3. Enfin, activer le glow et les particules
                waxSeal.classList.add("is-glowing");
                isIntroFinished = true;
            }, 1000); // Délai avant le glow
            
        }, 1000); // Délai entre phrase 1 et phrase 2
        
    }, 2800); 
});

function createFloatingAura() {
    const count = 200; 
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        p.style.width = '1px'; p.style.height = '1px';
        const radius = Math.random() * 10 + 35;
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
    const count = 0; 
}

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;
    
    waxSeal.classList.add("is-broken");
    introTop.classList.remove("is-visible");
    introBottom.classList.remove("is-visible");

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

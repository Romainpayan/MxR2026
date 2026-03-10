const env = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const scrollContent = document.getElementById("scrollContent");
const welcomeScreen = document.getElementById("welcomeScreen");
const flashOverlay = document.getElementById("flashOverlay");
const rsvpBtn = document.getElementById("submitRsvp");
const thanksMsg = document.getElementById("thanksMessage");

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

const handleInteraction = () => {
    if (cardState === 'peek') {
        card.classList.add("is-deployed");
        cardState = 'deployed';
    }
};

// Interaction sur la carte elle-même
card.addEventListener("click", handleInteraction);
window.addEventListener("wheel", (e) => {
    if (cardState === 'peek' && e.deltaY > 0) handleInteraction();
});
window.addEventListener("touchmove", () => { 
    if (cardState === 'peek') handleInteraction(); 
}, {passive: true});

// ANIMATION DE FIN
rsvpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    rsvpBtn.disabled = true;
    rsvpBtn.innerText = "ENVOI...";

    // 1. On rentre la carte dans l'enveloppe
    card.classList.remove("is-deployed");
    card.classList.add("is-reversing");
    cardState = 'closing';

    setTimeout(() => {
        // 2. On ferme le flap (rabat)
        env.classList.remove("is-opened");
        
        setTimeout(() => {
            // 3. On cache la carte physiquement pour ne pas qu'elle dépasse
            card.style.display = 'none';
            
            // 4. L'enveloppe se recentre
            env.classList.add("is-recentered");
            
            setTimeout(() => {
                // 5. Elle part (s'envoie)
                env.classList.add("is-sent");
                
                // 6. Message de remerciement
                setTimeout(() => {
                    thanksMsg.classList.add("is-visible");
                }, 800);
            }, 800);
        }, 800);
    }, 600);
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

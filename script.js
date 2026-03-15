/**
 * SCRIPT RSVP MARIAGE - Maëva & Romain
 */

// --- 1. CONFIGURATION DES SOURCES AUDIO ---
const ambMusic = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/amb.mp3');
const particleSfx = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/particles.mp3');
const waxSealSfx = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/waxseal.wav');
const openSfx = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/open.wav');
const slideSfx = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/slide.wav');
const swooshSfx = new Audio('https://github.com/Romainpayan/MxR2026/raw/refs/heads/main/swoosh.mp3');

// --- 2. RÉGLAGES DES VOLUMES (0.0 à 1.0) ---
ambMusic.volume = 0.4;     
ambMusic.loop = true;      
particleSfx.volume = 0.2;  
particleSfx.loop = true;   
waxSealSfx.volume = 0.8;
openSfx.volume = 0.3;
slideSfx.volume = 0.3;
swooshSfx.volume = 0.3;    

// --- 3. RÉGLAGES DES DÉLAIS (en millisecondes) ---
const DELAY_INTRO_SLIDE = 1000;
const DELAY_INTRO_MUSIC = 0;
const DELAY_OPEN_SEAL = 0;      
const DELAY_OPEN_PAPER = 1000;  
const DELAY_CLOSE_FLAP = 0;   
const DELAY_SENT_SLIDE = 0;  
const SWOOSH_COOLDOWN = 1500; 

// --- VARIABLES DE CONTRÔLE INTERNE ---
let isSwooshReady = true;
let isIntroFinished = false;
let cardState = 'hidden'; 

// --- FONCTIONS UTILITAIRES ---

function playWithDelay(audio, ms) {
    setTimeout(() => {
        audio.currentTime = 0; 
        audio.play();
    }, ms);
}

// Fonction pour le fondu de sortie de la musique
function fadeOutAudio(audio, duration) {
    const startVolume = audio.volume;
    const interval = 50; // On baisse le son toutes les 50ms
    const step = startVolume / (duration / interval);

    const fade = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fade);
        }
    }, interval);
}

// --- SÉLECTEURS ---
const env = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const welcomeScreen = document.getElementById("welcomeScreen");
const flashOverlay = document.getElementById("flashOverlay");
const rsvpBtn = document.getElementById("submitRsvp");
const thanksMsg = document.getElementById("thanksMessage");

// INITIALISATION
window.addEventListener('load', () => { 
    createFloatingAura(); 
});

// 4. ÉCRAN D'ACCUEIL
welcomeScreen.addEventListener("click", () => {
    welcomeScreen.classList.add("is-hidden");
    
    playWithDelay(ambMusic, DELAY_INTRO_MUSIC);
    playWithDelay(slideSfx, DELAY_INTRO_SLIDE);

    env.classList.add("is-animating");
    env.style.opacity = "1";
    
    setTimeout(() => {
        env.classList.remove("is-animating");
        waxSeal.classList.add("is-glowing");
        particleSfx.play();
        isIntroFinished = true;
    }, 2400); 
});

// 5. OUVERTURE DE L'ENVELOPPE
env.addEventListener("click", () => {
    if (!isIntroFinished || cardState !== 'hidden') return;
    
    particleSfx.pause();
    particleSfx.currentTime = 0;

    playWithDelay(waxSealSfx, DELAY_OPEN_SEAL);
    playWithDelay(openSfx, DELAY_OPEN_PAPER);

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

// 6. DÉPLOIEMENT ET SCROLL
const handleInteraction = () => {
    if (cardState === 'peek') {
        card.classList.add("is-deployed");
        cardState = 'deployed';
        playWithDelay(swooshSfx, 0);
    }
};

card.addEventListener("click", handleInteraction);

cardInner.addEventListener("scroll", () => {
    if (cardState === 'deployed' && isSwooshReady) {
        isSwooshReady = false;
        swooshSfx.currentTime = 0;
        swooshSfx.play();
        setTimeout(() => { isSwooshReady = true; }, SWOOSH_COOLDOWN);
    }
}, {passive: true});

window.addEventListener("wheel", (e) => {
    if (cardState === 'peek' && e.deltaY > 0) handleInteraction();
});
window.addEventListener("touchmove", () => { 
    if (cardState === 'peek') handleInteraction(); 
}, {passive: true});

// 7. GESTION DU FORMULAIRE ET ENVOI GOOGLE
rsvpBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const lastName = document.getElementById("guestLastName").value.trim();
    const firstName = document.getElementById("guestFirstName").value.trim();
    const presence = document.querySelector('input[name="presence"]:checked')?.value;
    const hasAllergies = document.querySelector('input[name="allergies"]:checked')?.value || "no";
    const allergyDetails = document.getElementById("allergyDetails").value.trim() || "Aucun";

    if (!lastName || !firstName || !presence) {
        alert("Oups ! Merci de renseigner ton Nom, Prénom et ta présence avant d'envoyer.");
        return;
    }

    const data = {
        lastName: lastName.toUpperCase(),
        firstName: firstName,
        presence: presence === "yes" ? "OUI" : "NON",
        hasAllergies: hasAllergies === "yes" ? "OUI" : "NON",
        allergyDetails: allergyDetails
    };

    rsvpBtn.disabled = true;
    rsvpBtn.innerText = "ENVOI EN COURS...";

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyyFBBnE9OKFGiiSfSVtvzF1IgyhDyz9nPSZeNfLWY9Xb9kgqVOLam1zd4TGp1g5Vo80Q/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
    .then(() => {
        localStorage.setItem('rsvp_fait', 'true');
        lancerAnimationSucces();
    })
    .catch(error => {
        console.error('Erreur !', error);
        alert("Désolé, une petite erreur est survenue. Réessaie ?");
        rsvpBtn.disabled = false;
        rsvpBtn.innerText = "ENVOYER MA RÉPONSE";
    });
});

// 8. ANIMATION DE SORTIE
function lancerAnimationSucces() {
    // --- FADE OUT DE LA MUSIQUE (sur 2 secondes) ---
    fadeOutAudio(ambMusic, 7000);

    card.classList.remove("is-deployed");
    card.classList.add("is-reversing");
    cardState = 'closing';

    setTimeout(() => {
        playWithDelay(openSfx, DELAY_CLOSE_FLAP);
        env.classList.remove("is-opened");
        
        setTimeout(() => {
            card.style.display = 'none';
            env.classList.add("is-recentered");
            
            setTimeout(() => {
                playWithDelay(slideSfx, DELAY_SENT_SLIDE);
                env.classList.add("is-sent");
                
                setTimeout(() => {
                    thanksMsg.classList.add("is-visible");
                }, 800);
            }, 800);
        }, 800);
    }, 600);
}

// 9. EFFET VISUEL : PARTICULES
function createFloatingAura() {
    const container = document.getElementById("floatingParticles");
    if(!container) return;
    
    for (let i = 0; i < 150; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        const radius = Math.random() * 10 + 40; 
        const duration = Math.random() * 10 + 10; 
        const startAngle = Math.random() * 360;
        const maxOp = Math.random() * 0.6 + 0.2; 
        const size = Math.random() < 0.5 ? 1 : 2; 
        
        p.style.width = size + 'px'; 
        p.style.height = size + 'px';
        p.style.setProperty('--radius', radius + 'px');
        p.style.setProperty('--duration', duration + 's');
        p.style.setProperty('--start-angle', startAngle + 'deg');
        p.style.setProperty('--max-op', maxOp);
        container.appendChild(p);
    }
}

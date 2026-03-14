/**
 * SCRIPT RSVP MARIAGE - Maëva & Romain
 * Gestion des animations, de la validation et de l'envoi vers Google Sheets
 */

// 1. SÉLECTEURS
const env = document.getElementById("envelope");
const waxSeal = document.getElementById("waxSeal");
const card = document.getElementById("card");
const welcomeScreen = document.getElementById("welcomeScreen");
const flashOverlay = document.getElementById("flashOverlay");
const rsvpBtn = document.getElementById("submitRsvp");
const thanksMsg = document.getElementById("thanksMessage");

// 2. VARIABLES D'ÉTAT
let isIntroFinished = false;
let cardState = 'hidden'; 

// 3. INITIALISATION
window.addEventListener('load', () => { 
    createFloatingAura(); 
    
    // Vérification si la personne a déjà répondu sur cet appareil
    if (localStorage.getItem('rsvp_fait') === 'true') {
        // Optionnel : on peut modifier le bouton ou laisser l'utilisateur renvoyer pour un proche
        console.log("L'utilisateur a déjà envoyé une réponse précédemment.");
    }
});

// 4. ÉCRAN D'ACCUEIL (SPLASH SCREEN)
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

// 5. OUVERTURE DE L'ENVELOPPE
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

// 6. DÉPLOIEMENT DE LA CARTE
const handleInteraction = () => {
    if (cardState === 'peek') {
        card.classList.add("is-deployed");
        cardState = 'deployed';
    }
};

card.addEventListener("click", handleInteraction);
window.addEventListener("wheel", (e) => {
    if (cardState === 'peek' && e.deltaY > 0) handleInteraction();
});
window.addEventListener("touchmove", () => { 
    if (cardState === 'peek') handleInteraction(); 
}, {passive: true});

// 7. GESTION DU FORMULAIRE ET ENVOI GOOGLE
rsvpBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Récupération des données
    const lastName = document.getElementById("guestLastName").value.trim();
    const firstName = document.getElementById("guestFirstName").value.trim();
    const presence = document.querySelector('input[name="presence"]:checked')?.value;
    const hasAllergies = document.querySelector('input[name="allergies"]:checked')?.value || "no";
    const allergyDetails = document.getElementById("allergyDetails").value.trim() || "Aucun";

    // --- VALIDATION STRICTE ---
    if (!lastName || !firstName || !presence) {
        alert("Oups ! Merci de renseigner ton Nom, Prénom et ta présence avant d'envoyer.");
        return;
    }

    // Préparation de l'objet pour Google
    const data = {
        lastName: lastName.toUpperCase(),
        firstName: firstName,
        presence: presence === "yes" ? "OUI" : "NON",
        hasAllergies: hasAllergies === "yes" ? "OUI" : "NON",
        allergyDetails: allergyDetails
    };

    // UI : On bloque le bouton
    rsvpBtn.disabled = true;
    rsvpBtn.innerText = "ENVOI EN COURS...";

    // URL DE TON SCRIPT GOOGLE (À REMPLACER !)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyyFBBnE9OKFGiiSfSVtvzF1IgyhDyz9nPSZeNfLWY9Xb9kgqVOLam1zd4TGp1g5Vo80Q/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Nécessaire pour Google Apps Script
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
    .then(() => {
        // Enregistrement local pour éviter les doubles clics rapides
        localStorage.setItem('rsvp_fait', 'true');
        
        // Succès : on lance l'animation de fermeture
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
    // La carte rentre dans l'enveloppe
    card.classList.remove("is-deployed");
    card.classList.add("is-reversing");
    cardState = 'closing';

    setTimeout(() => {
        // Le rabat de l'enveloppe se referme
        env.classList.remove("is-opened");
        
        setTimeout(() => {
            // On cache la carte
            card.style.display = 'none';
            // L'enveloppe revient au centre de l'écran
            env.classList.add("is-recentered");
            
            setTimeout(() => {
                // Elle s'envole (animation CSS is-sent)
                env.classList.add("is-sent");
                
                // On affiche le message de remerciement final
                setTimeout(() => {
                    thanksMsg.classList.add("is-visible");
                }, 800);
            }, 800);
        }, 800);
    }, 600);
}

// 9. EFFET VISUEL : PARTICULES DU SCEAU
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

const header = document.getElementById("header");
const env = document.getElementById("envelope");
const flap = document.getElementById("flap");
const card = document.getElementById("card");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const maxScroll = document.body.scrollHeight - vh;
    const progress = scrollY / maxScroll;

    // Phase 1 & 2 : Descente et Zoom
    if (progress <= 0.25) {
        const p = progress / 0.25;
        header.style.opacity = 1 - (p * 2);
        env.style.top = (50 + p * 35) + "%";
        env.style.transform = `translate(-50%, -50%) scale(${1 + p * 0.15})`;
    }

    // Phase 3 : Ouverture du rabat
    if (progress > 0.25 && progress <= 0.45) {
        const p = (progress - 0.25) / 0.20;
        const angle = p * 180;
        flap.style.transform = `rotateX(${angle}deg)`;
        
        // Changement de calque dynamique
        flap.style.zIndex = angle > 90 ? "2" : "20";
        card.style.opacity = p;
    }

    // Phase 4 : Sortie de la carte
    if (progress > 0.45) {
        const p = (progress - 0.45) / 0.55;
        flap.style.zIndex = "2";
        card.style.opacity = 1;
        card.style.transform = `translateY(${-p * 130}%)`;
    } else if (progress <= 0.45) {
        card.style.transform = "translateY(0)";
    }
});
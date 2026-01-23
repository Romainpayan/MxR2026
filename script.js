const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isAnimationComplete = false;

env.addEventListener("click", () => {
    if (isAnimationComplete) return;

    // 1. Descente (plus haute maintenant)
    env.classList.add("is-descended");
    header.style.opacity = "0";

    // 2. Ouverture
    setTimeout(() => {
        env.classList.add("is-opened");
    }, 1000);

    // 3. Bounce de la carte
    setTimeout(() => {
        card.classList.add("is-visible");
        isAnimationComplete = true;
    }, 1600);
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
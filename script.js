const header = document.getElementById("header");
const env = document.getElementById("envelope");
const card = document.getElementById("card");

let isAnimationComplete = false;

env.addEventListener("click", () => {
    if (isAnimationComplete) return;

    // 1. Descente
    env.classList.add("is-descended");
    header.style.opacity = "0";

    // 2. Ouverture (1s de délai)
    setTimeout(() => {
        env.classList.add("is-opened");
    }, 1000);

    // 3. Montée à -20px avec bounce (1.6s de délai)
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
    
    // On part bien de -20px et on monte
    card.style.transform = `translateY(calc(-20px - ${progress * 150}%))`;
});
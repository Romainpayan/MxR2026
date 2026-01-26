const introTop = document.getElementById("introTop");
const introBottom = document.getElementById("introBottom");
const env = document.getElementById("envelope");
const card = document.getElementById("card");
const waxSeal = document.getElementById("waxSeal");

let isIntroFinished = false;
let isAnimationComplete = false;
let hasCentered = false;

window.addEventListener('load', () => {
    setTimeout(() => {
        introTop.style.opacity = "1";
        introBottom.style.opacity = "1";
        waxSeal.classList.add("is-glowing");
        isIntroFinished = true;
    }, 3100);
});

env.addEventListener("click", () => {
    if (!isIntroFinished || isAnimationComplete) return;
    
    introTop.style.opacity = "0";
    introBottom.style.opacity = "0";
    
    // Déclenche la rupture et le scintillement
    waxSeal.classList.add("is-broken");
    
    setTimeout(() => {
        env.classList.add("is-active", "is-opened");
        setTimeout(() => { card.classList.add("is-visible"); }, 800);
        setTimeout(() => { isAnimationComplete = true; }, 1900);
    }, 600); 
});

window.addEventListener("scroll", () => {
    if (!isAnimationComplete) {
        if(window.scrollY > 0) window.scrollTo(0,0);
        return;
    }
    
    if (window.scrollY > 15 && !hasCentered) {
        hasCentered = true;
        card.classList.add("is-centered");
    } else if (window.scrollY < 10 && hasCentered) {
        hasCentered = false;
        card.classList.remove("is-centered");
    }
});

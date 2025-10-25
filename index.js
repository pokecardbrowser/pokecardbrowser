const overlay = document.getElementById("previewOverlay");
const previewImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".close");
const themeOpener = document.getElementById("themeOpener");
const downloadSetJson = document.querySelector(".downloadSetJson");
const totalThemes = 7;
let currentTheme;

const tryCurrentTheme = Cookies.get("currentTheme");
if (tryCurrentTheme) {
    currentTheme = parseInt(tryCurrentTheme, 10);
} else {
    currentTheme = 1;
};


function updateTheme() {
    document.body.style.backgroundImage = `url('https://pokecardbrowser-dev.duckdns.org/img/backgrounds/background${currentTheme}.png')`;
    Cookies.set("currentTheme", currentTheme, {expires: 365});
};

themeOpener.addEventListener("click", () => {
    currentTheme += 1;
    if (currentTheme > totalThemes) {
        currentTheme = 1;
    };
    updateTheme();
});

try {
    downloadSetJson.addEventListener("click", () => {
        const a = document.createElement("a");
        const setId = window.location.pathname.split('/').filter(Boolean).pop();
        a.href = `./${setId}.json`;
        a.download = `${setId}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
} catch {
    
};

try {
    previewTypes = ["card", "template"]
    previewTypes.forEach(type => {
        document.querySelectorAll(`.${type}`).forEach(item => {
            item.addEventListener("click", () => {
                previewImg.src = item.src;
                overlay.style.display = "flex";
            });
        });
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
        overlay.style.display = "none";
        }
    });
} catch {
    
};

updateTheme();
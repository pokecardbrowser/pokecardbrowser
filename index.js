const overlay = document.getElementById("previewOverlay");
const previewImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".close");

previewTypes = ["card", "template"]
previewTypes.forEach(type => {
    document.querySelectorAll(`.${type}`).forEach(item => {
        item.addEventListener("click", () => {
            previewImg.src = item.src;
            overlay.style.display = "flex";
        });
    });
})

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
});
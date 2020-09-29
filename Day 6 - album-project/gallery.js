const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const galleryImgs = document.querySelectorAll(".gallery-img");
let currentlySelected = 0;

prevBtn.addEventListener('click', function () {
    goPrev();
});

nextBtn.addEventListener('click', function () {
    goNext();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && currentlySelected < galleryImgs.length - 1) {
        goNext();
    }
    if (event.key === "ArrowLeft" && currentlySelected > 0)
        goPrev();
});


function goNext() {
    galleryImgs[currentlySelected].classList.remove("active");
    currentlySelected++;
    galleryImgs[currentlySelected].classList.add("active");
    prevBtn.disabled = false;
    if (currentlySelected === galleryImgs.length - 1) {
        nextBtn.disabled = true;
    }
}

function goPrev() {
    galleryImgs[currentlySelected].classList.remove("active");
    currentlySelected--;
    galleryImgs[currentlySelected].classList.add("active");
    if (currentlySelected === 0) {
        prevBtn.disabled = true;
    } else if (currentlySelected <= galleryImgs.length - 1) {
        nextBtn.disabled = false;
    }
}
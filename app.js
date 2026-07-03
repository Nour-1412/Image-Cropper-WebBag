// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("imageCanvas");

const ctx = canvas.getContext("2d");

let currentImage = null;
// ==========================
// ELEMENTS
// ==========================

const imageInput = document.getElementById("imageInput");

const chooseImage = document.getElementById("chooseImage");

const cropBtn = document.getElementById("cropBtn");

const croppedPreview = document.getElementById("croppedPreview");
// ==========================
// OPEN FILE PICKER
// ==========================

chooseImage.addEventListener("click", () => {

    imageInput.click();

});
// ==========================
// LOAD IMAGE
// ==========================

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img = new Image();

        img.onload = function () {

            currentImage = img;

            canvas.width = img.width;

            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0);

        };

        img.src = e.target.result;

    };

    reader.readAsDataURL(file);

});

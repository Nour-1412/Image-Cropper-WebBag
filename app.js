// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("imageCanvas");

const ctx = canvas.getContext("2d");

let currentImage = null;
// ==========================
// CROP RECTANGLE
// ==========================

let cropX = 100;

let cropY = 100;

let cropWidth = 200;

let cropHeight = 200;
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

// إطار القص

ctx.strokeStyle = "#2563eb";

ctx.lineWidth = 3;

ctx.strokeRect(

    cropX,

    cropY,

    cropWidth,

    cropHeight

);

        };

        img.src = e.target.result;

    };

    reader.readAsDataURL(file);

});

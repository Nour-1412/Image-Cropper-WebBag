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

// ==========================
// MOVE CROP RECTANGLE
// ==========================

let isDragging = false;

canvas.addEventListener("pointerdown", (e) => {

    isDragging = true;

});

canvas.addEventListener("pointerup", () => {

    isDragging = false;

});

canvas.addEventListener("pointermove", (e) => {

    if (!isDragging) return;

    const rect = canvas.getBoundingClientRect();

    cropX = e.clientX - rect.left - cropWidth / 2;

    cropY = e.clientY - rect.top - cropHeight / 2;

    drawCanvas();
});
// ==========================
// DRAW CANVAS
// ==========================

function drawCanvas() {

    if (!currentImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(currentImage, 0, 0);

    ctx.strokeStyle = "#2563eb";

    ctx.lineWidth = 3;

    ctx.strokeRect(

        cropX,

        cropY,

        cropWidth,

        cropHeight

    );

}
// ==========================
// TEST MOVE
// ==========================

canvas.addEventListener("click", () => {

    cropX += 20;

    drawCanvas();

});

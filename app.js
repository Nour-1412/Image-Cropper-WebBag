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
const downloadBtn = document.getElementById("downloadBtn");
const aspectRatio = document.getElementById("aspectRatio");
const restartBtn = document.getElementById("restartBtn");
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
drawCanvas();

        };

        img.src = e.target.result;

    };

    reader.readAsDataURL(file);

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
// ==========================
// DRAG CROP RECTANGLE
// ==========================

let isDragging = false;

let offsetX = 0;

let offsetY = 0;

canvas.addEventListener("pointerdown", (e) => {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;

    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;

    const y = (e.clientY - rect.top) * scaleY;

    if (

        x >= cropX &&

        x <= cropX + cropWidth &&

        y >= cropY &&

        y <= cropY + cropHeight

    ) {

        isDragging = true;

        offsetX = x - cropX;

        offsetY = y - cropY;

    }

});

canvas.addEventListener("pointermove", (e) => {

    if (!isDragging) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;

    const scaleY = canvas.height / rect.height;

    cropX = (e.clientX - rect.left) * scaleX - offsetX;

cropY = (e.clientY - rect.top) * scaleY - offsetY;

// منع خروج المستطيل خارج الصورة
cropX = Math.max(
    0,
    Math.min(cropX, canvas.width - cropWidth)
);

cropY = Math.max(
    0,
    Math.min(cropY, canvas.height - cropHeight)
);

    drawCanvas();

});

canvas.addEventListener("pointerup", () => {

    isDragging = false;

});

canvas.addEventListener("pointerleave", () => {

    isDragging = false;

});
// ==========================
// CROP IMAGE
// ==========================

cropBtn.addEventListener("click", () => {

    if (!currentImage) return;

    const tempCanvas = document.createElement("canvas");

    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = cropWidth;

    tempCanvas.height = cropHeight;

    tempCtx.drawImage(

        currentImage,

        cropX,

        cropY,

        cropWidth,

        cropHeight,

        0,

        0,

        cropWidth,

        cropHeight

    );

    croppedPreview.src = tempCanvas.toDataURL("image/png");
downloadBtn.style.display = "block";
});
// ==========================
// DOWNLOAD
// ==========================

downloadBtn.addEventListener("click", () => {

    if (!croppedPreview.src) return;

    const link = document.createElement("a");

    link.href = croppedPreview.src;

    link.download = "cropped-image.png";

    link.click();

});
// ==========================
// ASPECT RATIO
// ==========================

aspectRatio.addEventListener("change", () => {

    switch (aspectRatio.value) {

        case "1:1":
            cropWidth = 200;
            cropHeight = 200;
            break;

        case "4:3":
            cropWidth = 240;
            cropHeight = 180;
            break;

        case "16:9":
            cropWidth = 320;
            cropHeight = 180;
            break;

        case "3:2":
            cropWidth = 300;
            cropHeight = 200;
            break;

        case "9:16":
            cropWidth = 180;
            cropHeight = 320;
            break;

        default:
            cropWidth = 200;
            cropHeight = 200;

    }

    drawCanvas();

});
restartBtn.addEventListener("click", () => {

    

    if (!currentImage) return;

    cropWidth = 200;
cropHeight = 200;

cropX = (canvas.width - cropWidth) / 2;

cropY = (canvas.height - cropHeight) / 2;

    croppedPreview.src = "";

    downloadBtn.style.display = "none";

    drawCanvas();
aspectRatio.value = "free";
});

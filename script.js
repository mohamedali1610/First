const canvas = document.getElementById('drawing-canvas');
const clearButton = document.getElementById('clear-button');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const numDrawings = document.getElementById('num-drawings');
const topDrawings = document.getElementById('top-drawings');

const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

let drawingCount = 0;
let topDrawingsList = [];

clearButton.addEventListener('click', clearCanvas);
startButton.addEventListener('click', startDrawing);
stopButton.addEventListener('click', stopDrawing);

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function startDrawing() {
  const intervalId = setInterval(() => {
    const pixelX = Math.floor(Math.random() * canvasWidth);
    const pixelY = Math.floor(Math.random() * canvasHeight);
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = 255;
    setPixel(canvasData, pixelX, pixelY, red, green, blue, alpha);
    ctx.putImageData(canvasData, 0, 0);
  }, 10);
  setTimeout(() => {
    clearInterval(intervalId);
    const dataUrl = canvas.toDataURL();
    const rating = prompt('Please rate this drawing from 1 to 10');
    if (rating) {
      const drawing = { dataUrl, rating };
      saveDrawing(drawing);
    }
  }, 10000);
}

function stopDrawing() {
  // TODO: Implement stopDrawing function.
}

function setPixel(canvasData, x, y, r, g, b, a) {
  const index = (x + y * canvasWidth) * 4;
  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

function saveDrawing(drawing) {

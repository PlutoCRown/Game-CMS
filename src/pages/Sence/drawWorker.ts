let offscreenCanvas;
let ctx: CanvasRenderingContext2D;

self.onmessage = async (event) => {
    if (event.data.canvas) {
        offscreenCanvas = event.data.canvas;
        ctx = offscreenCanvas.getContext("2d");
    }

    if (event.data.imageUrl) {
        const imageBitmap = await loadImage(event.data.imageUrl);
        ctx.drawImage(imageBitmap, 0, 0);
    }
};

async function loadImage(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    return createImageBitmap(blob);
}
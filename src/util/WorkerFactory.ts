export const createWorker = (workerFunction: Function) => {
  const workerCode = workerFunction.toString();
  const workerBlob = new Blob([`(${workerCode})()`]);
  return new Worker(URL.createObjectURL(workerBlob));
};

/**
 * @example
 * const worker = createDrawWorker('./worker.js')
 * worker.postMessage({ imageUrl: "https://example.com/image.jpg" });
 */
export const createDrawWorker = (path: string) => {
  // 获取主线程的 Canvas
  const canvas = document.createElement("canvas");
  const offscreen = canvas.transferControlToOffscreen();

  // 创建 Worker
  const worker = new Worker(path);

  // 将 OffscreenCanvas 传输到 Worker（零拷贝）
  worker.postMessage({ canvas: offscreen }, [offscreen]);
  return worker;
}


export function imageDataToDataURL(imageData: ImageData, ) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    // 将 ImageData 绘制到画布上
    context!.putImageData(imageData, 0, 0);
    // 获取 Data URL
    const dataURL = canvas.toDataURL();
    return dataURL;
  }
export default () => {
  function calc(_: any) {
    console.log("开始计算");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("计算完成");
      }, 2000);
    });
  }

  self.onmessage = async (msg: any) => {
    const value = await calc(msg);
    self.postMessage(value);
  };
};

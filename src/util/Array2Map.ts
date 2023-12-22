export function Array2Map<T>(list: T[], keyPath: keyof T): Map<any, T> {
  const map = new Map();
  for (const item of list) {
    const key = item[keyPath];
    map.set(key, item);
  }
  return map;
}

export function Array2DeepMap<T extends Object>(
  list: T[],
  keyPath: string
): Map<any, T> {
  const map = new Map();
  for (let item of list) {
    let key = keyPath.toString();
    const keys = key.split(".");
    keys.map((k) =>
      item.hasOwnProperty(k)
        ? // @ts-ignore
          (item = item[k])
        : console.error(`路径错误: ${key}: ${keyPath}`)
    );
    map.set(item, item);
  }

  return map;
}

export function reverseObject<T extends Record<any, any>>(obj: T) {
  const reversedObj = {};
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    reversedObj[obj[key]] = key;
  });
  return reversedObj as { [K in keyof T as `${T[K]}`]: K };
}

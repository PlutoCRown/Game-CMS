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
    for (const k of keys) {
      if (item.hasOwnProperty(k)) {
        // @ts-ignore
        item = item[k];
      } else {
        throw new Error(`Invalid keyPath: ${key}`);
      }
    }
    map.set(item, item);
  }

  return map;
}

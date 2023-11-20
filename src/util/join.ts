export const join = <T, U extends { id: any }>(
  left: ReadonlyArray<T>,
  right: ReadonlyArray<U>,
  selector: keyof T
): Array<T & any> => {
  return left.map((item) => {
    return {
      ...item,
      [selector]:
        Object.prototype.toString.call(item[selector]) == "[object Array]"
          ? (item[selector] as Array<any>).map((id) =>
              right.find((obj) => id === obj.id)
            )
          : right.find((obj) => item[selector] === obj.id),
    };
  });
};

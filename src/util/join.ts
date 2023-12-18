import { Array2Map } from "./Array2Map";

export const join = (
  left: any[],
  right: any[],
  left_in: string,
  right_in: string = "id"
) => {
  const rightMapper = Array2Map(right, right_in);
  return left.map((leftItem) => ({
    ...leftItem,
    [left_in]: rightMapper.get(leftItem[left_in]),
  }));
};

import { Array2Map } from "./Array2Map";
import { join } from "./join";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alex Johnson" },
];

const posts = [
  { id: 1, title: "Post 1", author: 1 },
  { id: 2, title: "Post 2", author: 2 },
  { id: 3, title: "Post 3", author: 1 },
  { id: 4, title: "Post 4", author: 3 },
  { id: 5, title: "Post 5", author: 2 },
];

export function test() {
  return join(posts, users, "author", "id");
}

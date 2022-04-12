import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Football",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Cricket",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Tennis",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Badminton",
    description: "",
  },
];

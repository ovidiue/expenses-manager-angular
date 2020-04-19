import { Category } from "./category";
import { Tag } from "./tag";

export interface Expense {
  title: string;
  description: string;
  recurrent: boolean;
  amount: number;
  createdOn: Date;
  dueDate: Date;
  id: number;
  payed: number;
  category: Category;
  tags: Tag[];
}

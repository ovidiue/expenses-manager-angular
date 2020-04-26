import { Category } from './category.interface';
import { Tag } from './tag.interface';

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

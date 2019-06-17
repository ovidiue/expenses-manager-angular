import {Category} from './category';
import {Tag} from './tag';
export class Expense {
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

  constructor() {
  }
}

import {Category} from 'category';
import {Tag} from './tag';

export class Expense {
  name: string;
  amount: number;
  dateCreated: Date;
  dueDate: Date;
  category: Category;
  tags: Tag[];
  id: number;
  constructor() {}
}

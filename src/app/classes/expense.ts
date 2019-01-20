import {Tag} from './tag';

export class Expense {
  name: string;
  amount: number;
  dateCreated: Date;
  dueDate: Date;
  tags: Tag[];
  id: number;

  constructor() {
  }
}

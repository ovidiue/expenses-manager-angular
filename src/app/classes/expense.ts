import {Tag} from './tag';

export class Expense {
  title: string;
  description: string;
  recurrent: boolean;
  amount: number;
  createdOn: Date;
  dueDate: Date;
  tags: Tag[];
  id: number;
  payed: number;

  constructor() {
  }
}

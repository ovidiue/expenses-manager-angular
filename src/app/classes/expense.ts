export class Expense {
  title: string;
  description: string;
  recurrent: boolean;
  amount: number;
  createdOn: Date;
  dueDate: Date;
  id: number;
  payed: number;

  constructor() {
  }
}

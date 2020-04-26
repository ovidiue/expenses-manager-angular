import { Expense } from './expense.interface';

export interface Rate {
  amount: number;
  creationDate: Date;
  observation: string;
  payedOn: Date;
  id: number;
  expense: Expense;
}

import { Expense } from "./expense";

export interface Rate {
  amount: number;
  creationDate: Date;
  observation: string;
  payedOn: Date;
  id: number;
  expense: Expense;
}

export interface ExpenseFilter {
  amountFrom?: number;
  amountTo?: number;
  title?: string;
  description?: string;
  recurrent?: boolean;
  categoryId?: number;
  tagIds?: number[];
  createdFrom?: Date;
  createdTo?: Date;
  dueDateFrom?: Date;
  dueDateTo?: Date;
}

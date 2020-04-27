import { Component, Input } from '@angular/core';
import { Expense } from '@models/interfaces';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss'],
})
export class ExpenseCardComponent {
  @Input() expense: Expense;
  expandedDescription = false;
}

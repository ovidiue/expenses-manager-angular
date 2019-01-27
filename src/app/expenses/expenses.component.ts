import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpenses: Expense[] = [];

  constructor(private expenseService: ExpenseService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(resp => {
      console.log('expenses: ', resp);
      this.expenses = resp;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these expenses?',
      accept: () => {
        const ids = this.selectedExpenses.map(el => el.id);
        console.log('ids to delete', ids);
        this.expenseService.deleteExpenses(ids)
        .then(resp => {
          console.log('resp', resp);
          this.expenses = this.expenses.filter(ex => ids.indexOf(ex.id) < 0);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully deleted expenses...'});
        })
        .catch(err => alert('something went wrong' + err));
      }
    });
  }

  onEdit(ex: Expense): void {
    console.log('edit', ex);
  }

  onDelete(ex: Expense): void {
    console.log('delete', ex);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${ex.title} ?`,
      accept: () => {
        this.expenseService.deleteExpenses([ex.id])
        .then(resp => {
          this.expenses = this.expenses.filter(el => el.id !== ex.id);
        });
      }
    });
  }

}

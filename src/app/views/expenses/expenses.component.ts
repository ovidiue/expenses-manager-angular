import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  DialogService,
  DynamicDialogConfig,
  LazyLoadEvent,
  MenuItem,
  MessageService
} from 'primeng/api';
import { Expense } from '../../models/expense';
import { GlobalNotificationService } from '../../services/global-notification.service';
import { MESSAGES } from '../../utils/messages';
import { DialogRatesComponent } from '../../components/dialog-rates/dialog-rates.component';
import { fadeIn } from '../../utils/animations/fadeIn';
import { FormGroup } from '@angular/forms';
import { ExpenseFilter } from '../../models/filters/expense-filter';
import * as moment from 'moment';
import { TABLE_DEFAULTS } from '../../utils/table-options';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ExpensesDataService } from './expenses-data.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  animations: [fadeIn],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogConfig]
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpenses: Expense[] = [];

  displayDelete = false;
  deletionText = '';
  selectedForDeletion: Expense;

  selectedDescription = '';
  displaySidebar = false;

  categories = [];
  tags = [];
  categoryToAssign: Category;

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    totalTableRecords: 0,
    columns: [
      {name: 'Title', value: 'title'},
      {name: 'Amount', value: 'amount'},
      {name: 'Description', value: 'description'},
      {name: 'Recurrent', value: 'recurrent'},
      {name: 'Created On', value: 'createdOn'},
      {name: 'Due Date', value: 'dueDate'},
      {name: 'Category', value: 'category'},
      {name: 'Tags', value: 'tags'},
      {name: 'Payed', value: 'payed'}
    ],
    actions: <MenuItem[]>[]
  };

  lastEvent: LazyLoadEvent;

  filterForm: FormGroup;
  expenseFilter: ExpenseFilter;

  constructor(
      private router: Router,
      private service: ExpensesDataService,
      public dialogService: DialogService,
      private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.instantiateTableActions();
  }

  instantiateTableActions(): void {
    this.tableOptions.actions = [
      {
        label: 'Delete Selection',
        command: () => {
          if (!this.areRowsSelected()) {
            this.globalNotificationService.add(MESSAGES.NO_ROWS_SELECTED);
            return false;
          }
          this.displayDeleteMultiple();
        }
      },
      {
        label: 'Assign Category',
        command: () => {
          if (!this.areRowsSelected()) {
            this.globalNotificationService.add(MESSAGES.NO_ROWS_SELECTED);
            return false;
          }
          this.displaySidebar = true;
        }
      }
    ];
  }

  areRowsSelected(): boolean {
    return this.selectedExpenses.length > 0;
  }

  goToAddExpense(): void {
    this.router.navigate(['/expenses/add']);
  }

  searchValues($event: any): void {
    console.log('searchValues parent', $event);
    this.expenseFilter = this.mapToExpenseFilter($event);
    this.service.getExpenses(this.lastEvent, this.expenseFilter).subscribe(resp => {
      this.expenses = resp.content;
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
    });
  }

  getExpenses(event: LazyLoadEvent): void {
    this.service.getExpenses(event, this.expenseFilter).subscribe(resp => {
      this.expenses = resp.content || [];
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
      this.lastEvent = event;
    });
  }

  assignNewCategory(): void {
    console.log(this.categoryToAssign);
    console.log(this.selectedExpenses);
    const expensesIds = this.selectedExpenses.map(exp => exp.id);
    this.service.setCategory(expensesIds, this.categoryToAssign.id)
    .subscribe(() => {
      this.getExpenses(this.lastEvent);
      this.globalNotificationService.add(MESSAGES.EXPENSE.SET_NEW_CATEGORY);
    });
    this.resetAssignVariables();
  }

  decideVisibilityAccordingToPayedField(): boolean {
    if (this.selectedForDeletion) {
      return this.selectedForDeletion.payed > 0;
    } else {
      return this.selectedExpenses.filter(ex => ex.payed > 0).length > 0;
    }
  }

  deleteExpense(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.service.deleteExpenses(idsToDelete, false)
    .subscribe(() => {
          this.resetDeletionVariables();
          this.getExpenses(this.lastEvent);
          this.globalNotificationService.add(MESSAGES.EXPENSE.DELETE_SINGLE);
        }, (() => this.globalNotificationService.add(MESSAGES.ERROR))
    );

  }

  resetDeletionVariables(): void {
    this.displayDelete = false;
    this.deletionText = '';
    this.selectedForDeletion = null;
    this.selectedExpenses = [];
  }

  displayDeleteMultiple() {
    this.displayDelete = true;
    this.deletionText = 'Are you sure you want to delete following expenses:' + this.selectedExpenses.map(ex => ex.title).join(', ') + ' ?';
  }

  displayDeleteRow(ex: Expense): void {
    this.displayDelete = true;
    this.selectedForDeletion = ex;
    this.deletionText = `Are you sure you want to delete ${this.selectedForDeletion.title} ?`;
  }

  deleteExpenseAndRates(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.service.deleteExpenses(idsToDelete, true)
    .subscribe(() => {
      this.resetDeletionVariables();
      this.getExpenses(this.lastEvent);
      this.globalNotificationService.add(MESSAGES.EXPENSE.DELETE_SINGLE);
    }, (() => this.globalNotificationService.add(MESSAGES.ERROR)));
  }

  fetchAndDisplayRates(exp: Expense): void {
    this.service.getRatesByExpenseId(exp.id).then(resp => {
      const width = resp.content.length > 0 ? '70%' : '30%';
      this.dialogService.open(DialogRatesComponent, <DynamicDialogConfig>{
        header: `${exp.title} - rates`,
        width,
        data: {
          resp: resp
        }
      });
    });
  }

  resetAssignVariables(): void {
    this.displaySidebar = false;
    this.selectedExpenses = [];
    this.categoryToAssign = null;
  }

  mapToExpenseFilter(obj: any): ExpenseFilter {
    const expenseFilter: ExpenseFilter = {};

    if (obj.amount) {
      obj.amountFrom = obj.amount[0];
      obj.amountTo = obj.amount[1];
      delete obj.amount;
    }

    if (obj.createdBetween) {
      obj.createdFrom = moment(obj.createdBetween[0]).format('DD-MM-YYYY');
      obj.createdTo = moment(obj.createdBetween[1]).format('DD-MM-YYYY');
      delete obj.createdBetween;
    }

    if (obj.dueBetween) {
      obj.dueDateFrom = moment(obj.dueBetween[0]).format('DD-MM-YYYY');
      obj.dueDateTo = moment(obj.dueBetween[1]).format('DD-MM-YYYY');
      delete obj.dueBetween;
    }

    if (obj.category) {
      obj.categoryId = obj.category.id;
      delete obj.category;
    }

    if (obj.tags) {
      obj.tagIds = obj.tags.map(tag => tag.id);
      delete obj.tags;
    }

    for (const key in obj) {
      if (obj[key] !== null && typeof obj[key] !== 'undefined' && obj[key] !== '') {
        expenseFilter[key] = obj[key];
      }
    }

    return expenseFilter;

  }
}


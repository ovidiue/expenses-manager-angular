import {Component, OnInit} from '@angular/core';
import {ConfirmationService, DialogService, DynamicDialogConfig, MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../services/expense.service';
import {RateService} from '../services/rate.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {DialogRatesComponent} from '../dialog-rates/dialog-rates.component';
import {fadeIn} from '../utils/animations/fadeIn';
import {CategoryService} from '../services/category-service.service';
import {TagService} from '../services/tag.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ExpenseFilter} from '../classes/filters/expense-filter';
import * as moment from 'moment';

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

  amountBetween: number[] = [0, 10000];
  categories = [];
  tags = [];
  createdBetween;
  dueBetween;

  filterForm: FormGroup;

  constructor(private expenseService: ExpenseService,
              private rateService: RateService,
              private categoryService: CategoryService,
              private tagService: TagService,
              public dialogService: DialogService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getExpenses();
    this.getCategories();
    this.getTags();
    this.instantiateForm();
    this.onFormChange();
  }

  clearFormFilters(event: any): void {
    event.stopPropagation();
    this.filterForm.reset();
    // TODO fix form reset
  }

  onFormChange(): void {
    const self = this;
    self.filterForm.valueChanges.subscribe(val => {
      setTimeout(function () {
        const expenseFilter = self.mapToExpenseFilter(val);
        self.expenseService.getExpenses(expenseFilter).then(resp => {
          console.log('resp: ', resp);
          self.expenses = resp;
        });
      }, 500);
    });
  }

  instantiateForm(): void {
    this.filterForm = new FormGroup({
      title: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
      createdBetween: new FormControl(''),
      dueBetween: new FormControl(''),
      recurrent: new FormControl(false),
      category: new FormControl(''),
      tags: new FormControl('')
    });
  }

  getExpenses(): void {
    this.expenseService.getExpenses().then(resp => {
      this.expenses = resp || [];
    });
  }

  getTags(): void {
    this.tagService.getTags().subscribe(tags => this.tags = tags.map(el => {
      return {
        label: el.name,
        value: {id: el.id, name: el.name, color: el.color},
        color: el.color
      };
    }));
  }


  getCategories(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats.map(el => {
        return {
          label: el.name,
          value: el,
          color: el.color
        };
      });
    });
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
    this.expenseService.deleteExpenses(idsToDelete, false)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses();
      this.globalNotificationService.add(MESSAGES.deletedExpense);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
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
    console.log('sdasdas');
  }

  deleteExpenseAndRates(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.expenseService.deleteExpenses(idsToDelete, true)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses();
      this.globalNotificationService.add(MESSAGES.deletedExpense);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

  fetchAndDisplayRates(exp: Expense): void {

    this.rateService.getRatesByExpenseId(exp.id).then(rates => {
      const ref = this.dialogService.open(DialogRatesComponent, <DynamicDialogConfig>{
        header: 'Rates',
        width: '70%',
        data: {
          rates: rates
        }
      });
    });
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

    console.log('in mapToExpenseFilter obj:', obj);
    for (const key in obj) {
      if (obj[key] !== null && typeof obj[key] !== 'undefined' && obj[key] !== '') {
        expenseFilter[key] = obj[key];
      }
    }

    return expenseFilter;

  }
}


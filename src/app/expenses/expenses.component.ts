import {Component, OnInit} from '@angular/core';
import {ConfirmationService, DialogService, DynamicDialogConfig, LazyLoadEvent, MenuItem, MessageService} from 'primeng/api';
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
import {TABLE_DEFAULTS} from '../utils/table-options';
import {Category} from '../classes/category';
import {Router} from '@angular/router';

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

  amountBetween: number[] = [0, 10000];
  beautifiedFilters: string[] = [];
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

  constructor(private expenseService: ExpenseService,
              private rateService: RateService,
              private categoryService: CategoryService,
              private tagService: TagService,
              private router: Router,
              public dialogService: DialogService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getTags();
    this.instantiateForm();
    this.onFormChange();
    this.instantiateTableActions();
  }

  instantiateTableActions(): void {
    this.tableOptions.actions = [
      {
        label: 'Delete Selection',
        command: () => {
          if (!this.areRowsSelected()) {
            this.globalNotificationService.add(MESSAGES.no_rows_selected);
            return false;
          }
          this.displayDeleteMultiple();
        }
      },
      {
        label: 'Assign Category',
        command: () => {
          if (!this.areRowsSelected()) {
            this.globalNotificationService.add(MESSAGES.no_rows_selected);
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

  clearFormFilters(): void {
    this.filterForm.reset();
    this.amountBetween = [0, 10000];
    this.searchValues();
  }

  parseFilters(obj: any): string[] {
    const result = [];
    if (obj) {
      for (const key in obj) {
        if (obj[key] !== '' && obj[key] !== null) {
          let value = '';
          switch (key) {
            case 'amount':
              value = 'Amount between: ' + obj[key][0] + '-' + obj[key][1];
              break;
            case 'category':
              value = 'Category: ' + obj[key].name;
              break;
            case 'createdBetween':
              value = 'Created between: ' + moment(obj[key][0]).format('L') + ' - ' +
                moment(obj[key][1]).format('L');
              break;
            case 'dueBetween':
              value = 'Due between: ' + moment(obj[key][0]).format('L') + ' - ' +
                moment(obj[key][1]).format('L');
              break;
            case 'title':
              value = 'Title contains: ' + obj[key];
              break;
            case 'description':
              value = 'Description contains: ' + obj[key];
              break;
            case 'recurrent':
              value = 'Recurrent: ' + obj[key];
              break;
            case 'tags':
              value = 'Tags: ' + obj[key].map(el => el.name).concat();
              break;
          }
          result.push(value);
        }
      }
    }
    return result;
  }

  searchValues(): void {
    this.beautifiedFilters = this.parseFilters(this.filterForm.value);
    this.expenseFilter = this.mapToExpenseFilter(this.filterForm.value);
    this.expenseService.getExpenses(this.lastEvent, this.expenseFilter).then(resp => {
      this.expenses = resp.content;
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
    });
  }

  onFormChange(): void {
    const self = this;
    self.filterForm.valueChanges.subscribe(val => {
      this.beautifiedFilters = self.parseFilters(val);
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

  getExpenses(event: LazyLoadEvent): void {
    this.expenseService.getExpenses(event, this.expenseFilter).then(resp => {
      this.expenses = resp.content || [];
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
      this.lastEvent = event;
    });
  }

  getTags(): void {
    this.tagService.getTags(TABLE_DEFAULTS.maxSize).then(resp => this.tags = resp.content.map(el => {
      return {
        label: el.name,
        value: {id: el.id, name: el.name, color: el.color},
        color: el.color
      };
    }));
  }

  getCategories(): void {
    this.categoryService.getCategories(TABLE_DEFAULTS.maxSize)
    .then(resp => {
      this.categories = resp.content.map(el => {
        return {
          label: el.name,
          value: el,
          color: el.color
        };
      });
    });
  }

  assignNewCategory(): void {
    console.log(this.categoryToAssign);
    console.log(this.selectedExpenses);
    const expensesIds = this.selectedExpenses.map(exp => exp.id);
    this.expenseService.setNewCategory(expensesIds, this.categoryToAssign.id)
    .then(() => {
      this.getExpenses(this.lastEvent);
      this.globalNotificationService.add(MESSAGES.set_new_category);
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
    this.expenseService.deleteExpenses(idsToDelete, false)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses(this.lastEvent);
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
  }

  deleteExpenseAndRates(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.expenseService.deleteExpenses(idsToDelete, true)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses(this.lastEvent);
      this.globalNotificationService.add(MESSAGES.deletedExpense);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

  fetchAndDisplayRates(exp: Expense): void {
    this.rateService.getRatesByExpenseId(exp.id).then(resp => {
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


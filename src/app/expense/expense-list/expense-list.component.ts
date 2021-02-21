import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Expense, ExpenseFilter, Rate, ServerResp, } from '@models/interfaces';
import { DialogRatesComponent } from '@shared/components';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig } from 'primeng';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, } from 'primeng/api';

import { ExpenseFacade } from '../expense.facade';

@Component({
  selector: 'app-expenses',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  animations: [fadeIn],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService,
    DynamicDialogConfig,
  ],
})
export class ExpenseListComponent implements OnInit {
  expenses$ = this.expenseFacade.expenses$;
  selectedExpenses: Expense[] = [];

  displayDelete$ = this.expenseFacade.getModalVisible();
  deletionText = '';
  selectedForDeletion: Expense;

  selectedDescription = '';
  displaySidebar = false;

  categories$ = this.expenseFacade.categories$;
  tags$ = this.expenseFacade.tags$;
  categoryToAssign: Category;

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    totalTableRecords: 0,
    columns: [
      { name: 'Name', value: 'name' },
      { name: 'Amount', value: 'amount' },
      { name: 'Description', value: 'description' },
      { name: 'Recurrent', value: 'recurrent' },
      { name: 'Created On', value: 'createdOn' },
      { name: 'Due Date', value: 'dueDate' },
      { name: 'Category', value: 'category' },
      { name: 'Tags', value: 'tags' },
      { name: 'Payed', value: 'payed' },
    ],
    actions: <MenuItem[]>[],
  };

  lastEvent: LazyLoadEvent;

  expenseFilter: ExpenseFilter;
  total$ = this.expenseFacade.total$;

  constructor(
    private router: Router,
    private expenseFacade: ExpenseFacade,
    public dialogService: DialogService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.instantiateTableActions();
  }

  instantiateTableActions(): void {
    this.tableOptions.actions = [
      {
        label: 'Delete Selection',
        command: () => {
          if (!this.areRowsSelected()) {
            this.toastr.warning(MESSAGES.NO_ROWS_SELECTED);

            return false;
          }
          this.displayDeleteMultiple();
        },
      },
      {
        label: 'Assign Category',
        command: () => {
          if (!this.areRowsSelected()) {
            this.toastr.warning(MESSAGES.NO_ROWS_SELECTED);

            return false;
          }
          this.displaySidebar = true;
        },
      },
    ];
  }

  areRowsSelected(): boolean {
    return this.selectedExpenses.length > 0;
  }

  searchValues($event: any): void {
    this.expenseFilter = this.expenseFacade.mapToExpenseFilter($event);
    this.expenseFacade.getExpenses(this.lastEvent, this.expenseFilter);
  }

  getExpenses(event: LazyLoadEvent): void {
    this.expenseFacade.getExpenses(event, this.expenseFilter);
  }

  assignNewCategory(): void {
    const expensesIds = this.selectedExpenses.map((exp) => exp.id);
    this.expenseFacade.setCategoryApi(expensesIds, this.categoryToAssign.id);
    this.resetAssignVariables();
  }

  decideVisibilityAccordingToPayedField(): boolean {
    if (this.selectedForDeletion) {
      return this.selectedForDeletion.payed > 0;
    } else {
      return this.selectedExpenses.filter((ex) => ex.payed > 0).length > 0;
    }
  }

  deleteExpense(): void {
    const idsToDelete = this.selectedForDeletion
      ? [this.selectedForDeletion.id]
      : this.selectedExpenses.map((ex) => ex.id);
    this.expenseFacade.deleteExpensesApi(idsToDelete, false);
  }

  resetDeletionVariables(): void {
    this.expenseFacade.setModalVisibility(false);
    this.deletionText = '';
    this.selectedForDeletion = null;
    this.selectedExpenses = [];
  }

  displayDeleteMultiple() {
    // TODO investigate to have expense marked for deletion
    this.expenseFacade.setModalVisibility(true);
    this.deletionText =
      'Are you sure you want to delete following expenses$:' +
      this.selectedExpenses.map((ex) => ex.name).join(', ') +
      ' ?';
  }

  displayDeleteRow(ex: Expense): void {
    // TODO investigate to have expense marked for deletion
    this.expenseFacade.setModalVisibility(true);
    this.selectedForDeletion = ex;
    this.deletionText = `Are you sure you want to delete ${this.selectedForDeletion.name} ?`;
  }

  deleteExpenseAndRates(): void {
    const idsToDelete = this.selectedForDeletion
      ? [this.selectedForDeletion.id]
      : this.selectedExpenses.map((ex) => ex.id);
    this.expenseFacade.deleteExpensesApi(idsToDelete, true);
  }

  fetchAndDisplayRates(exp: Expense): void {
    this.expenseFacade
      .getRatesByExpenseIdApi(exp.id)
      .subscribe((resp: ServerResp<Rate[]>) => {
        const width = resp.data.length > 0 ? '70%' : '30%';
        this.dialogService.open(DialogRatesComponent, <DynamicDialogConfig>{
          header: `${exp.name} - rates`,
          width,
          data: {
            resp,
          },
        });
      });
  }

  resetAssignVariables(): void {
    this.displaySidebar = false;
    this.selectedExpenses = [];
    this.categoryToAssign = null;
  }

  goToAddExpense() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  goToEditExpense(id: any) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
}

import * as moment from 'moment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { ExpenseDetailService } from './expense-detail.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { fadeIn } from '@utils/animations/fadeIn';
import { Expense } from '@models/expense';
import { MESSAGES } from '@utils/messages';
import { GlobalNotificationService } from '@services/global-notification.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn]
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {
  pageTitle: string;
  isFormSubmitted = false;
  expenseForm: FormGroup;
  paramSubscription: Subscription;
  formSubscription: Subscription;
  idSubscription: Subscription;
  minDate = moment().startOf('day').toDate();
  tags$: Observable<SelectItem[]>;
  categories$: Observable<SelectItem[]>;
  id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private location: Location,
              private router: Router,
              private globalNotificationService: GlobalNotificationService,
              private service: ExpenseDetailService,
              private route: ActivatedRoute) {
  }

  get title(): AbstractControl {
    return this.expenseForm.get('title');
  }

  get amount(): AbstractControl {
    return this.expenseForm.get('amount');
  }

  ngOnInit() {
    this.paramSubscription = this.route.params
    .subscribe(params => {
      this.pageTitle = params && params.id
          ? 'Edit Expense'
          : 'Add Expense';
      this.id$.next(params.id || null);
    });

    this.idSubscription = this.id$
    .pipe(
        filter(id => id !== null),
        flatMap(id => this.service.getExpense(id)),
    )
    .subscribe(exp => this.expenseForm.patchValue(exp));

    this.expenseForm = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      dueDate: new FormControl(''),
      category: new FormControl(null),
      tags: new FormControl([]),
    });

    this.tags$ = this.service.getTags();
    this.categories$ = this.service.getCategories();

    this.formSubscription = this.expenseForm.valueChanges
    .subscribe(() => this.isFormSubmitted = false);

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    const expense = new Expense();
    Object.assign(expense, this.expenseForm.value);
    this.service
    .saveExpense(expense)
    .subscribe(() => {
          this.router.navigate(['/expenses']);
          this.globalNotificationService.add(MESSAGES.EXPENSE.ADD);
        },
        err => this.globalNotificationService.add(MESSAGES.ERROR)
    );
  }


}

import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Category, Tag } from '@models/interfaces';
import { ExpenseFacade } from '../expense.facade';

export class ExpenseDetailBase implements OnDestroy {
  pageTitle: string;
  isFormSubmitted = false;
  expenseForm: FormGroup;
  minDate = new Date();
  tags$: Observable<Tag[]>;
  categories$: Observable<Category[]>;
  protected _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected router: Router,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute
  ) {
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      dueDate: new FormControl(''),
      category: new FormControl(null),
      tags: new FormControl([]),
    });

    this.tags$ = this.expenseFacade.tags$;
    this.categories$ = this.expenseFacade.categories$;
  }

  get name(): AbstractControl {
    return this.expenseForm.get('name');
  }

  get amount(): AbstractControl {
    return this.expenseForm.get('amount');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

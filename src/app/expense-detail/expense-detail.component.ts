import {Component, OnInit} from '@angular/core';
import {Expense} from '../classes/expense';
import * as moment from 'moment';
import {ExpenseService} from '../expense.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  expense = new Expense();
  minDate = moment().startOf('day').toDate();
  pageTitle: string = this.determineTitle();
  id: number;

  constructor(private location: Location,
              private router: Router,
              private expenseService: ExpenseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    console.log('id', this.id);
    this.expenseService.getExpense(this.id).then(exp => {
      this.expense = exp;
      if (this.expense.dueDate) {
        this.expense.dueDate = moment(this.expense.dueDate).toDate();
      }
    }).catch(err => console.error(err));
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Expense';
    } else {
      return 'Add Expense';
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.expense);
    this.expenseService.saveExpense(this.expense);
    this.router.navigate(['/expenses']);
  }


}

import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ExpenseService} from '../services/expense.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TagService} from '../services/tag.service';
import {CategoryService} from '../services/category-service.service';
import {MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService]
})
export class ExpenseDetailComponent implements OnInit {
  expense = new Expense();
  minDate = moment().startOf('day').toDate();
  pageTitle: string = this.determineTitle();
  tags: any[];
  categories: any[];
  id: number;

  constructor(private location: Location,
              private router: Router,
              private globalNotificationService: GlobalNotificationService,
              private expenseService: ExpenseService,
              private tagService: TagService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    this.expenseService.getExpense(this.id).then(exp => {
      this.expense = exp;
      if (this.expense.dueDate) {
        this.expense.dueDate = moment(this.expense.dueDate).toDate();
      }
    }).catch(err => console.error(err));

    this.getTags();
    this.getCategories();
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

  determineTitle(): string {
    if (this.id) {
      return 'Edit Expense';
    } else {
      return 'Add Expense';
    }
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.expenseService
    .saveExpense(this.expense)
    .then(() => {
      this.router.navigate(['/expenses']);
      this.globalNotificationService.add(MESSAGES.addExpense);
    })
    .catch(err => this.globalNotificationService.add(MESSAGES.error));
  }


}

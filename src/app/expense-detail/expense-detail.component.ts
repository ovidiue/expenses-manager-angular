import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ExpenseService} from '../expense.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TagService} from '../tag.service';
import {CategoryService} from '../category-service.service';
import {MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';


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
              private messageService: MessageService,
              private expenseService: ExpenseService,
              private tagService: TagService,
              private categoryService: CategoryService,
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

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.expense);
    this.expenseService
    .saveExpense(this.expense)
    .then(resp => this.router.navigate(['/expenses']))
    .catch(err => this.messageService.add({severity: 'error', summary: 'Error', detail: 'error: '}));
  }


}

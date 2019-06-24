import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Expense} from '../../models/expense';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {ExpenseDetailService} from './expense-detail.service';


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn]
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
              private service: ExpenseDetailService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    this.service.getExpense(this.id).then(exp => {
      this.expense = exp;
      if (this.expense.dueDate) {
        this.expense.dueDate = moment(this.expense.dueDate).toDate();
      }
    }).catch(err => console.error(err));

    this.getTags();
    this.getCategories();
  }

  getTags(): void {
    this.service.getTags(TABLE_DEFAULTS.maxSize).subscribe(resp => this.tags = resp.content.map(el => {
      return {
        label: el.name,
        value: {id: el.id, name: el.name, color: el.color},
        color: el.color
      };
    }));
  }

  getCategories(): void {
    this.service.getCategories(TABLE_DEFAULTS.maxSize)
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
    this.service
    .saveExpense(this.expense)
    .then(() => {
      this.router.navigate(['/expenses']);
      this.globalNotificationService.add(MESSAGES.addExpense);
    })
    .catch(err => this.globalNotificationService.add(MESSAGES.error));
  }


}

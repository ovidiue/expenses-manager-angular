import {Component, OnInit} from '@angular/core';
import {Rate} from '../classes/rate';
import {ActivatedRoute, Router} from '@angular/router';
import {RateService} from '../rate.service';
import {Location} from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss']
})
export class RateDetailComponent implements OnInit {
  pageTitle: string;
  rate = new Rate();
  id: number;
  nameExists = false;
  maxDate = moment().toDate();

  constructor(private location: Location,
              private router: Router,
              private rateService: RateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    this.getRate();
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Rate';
    } else {
      return 'Add Rate';
    }
  }

  getRate(): void {
    if (this.id) {
      this.rateService.get(this.id).then(rate => {
        this.rate = rate;
        this.rate.payedOn = moment(this.rate.payedOn).toDate();
      }).catch(err => console.error(err));
    }
  }

  checkName($event): void {
    const name = $event.target.value;
    this.rateService.getByName(name)
    .then(resp => {
      if (resp) {
        this.nameExists = true;
      } else {
        this.nameExists = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.rateService.save(this.rate)
    .then(resp => this.router.navigate(['/rates']))
    .catch(err => alert(err.toString()));
  }

}

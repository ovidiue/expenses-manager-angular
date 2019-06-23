import {Component, OnInit} from '@angular/core';
import {Tag} from '../../models/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TagDetailDataService} from './tag-detail-data.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailComponent implements OnInit {
  pageTitle: string;
  tag = new Tag();
  id: number;
  nameExists = false;

  constructor(private location: Location,
              private router: Router,
              private globalNotificationService: GlobalNotificationService,
              private service: TagDetailDataService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    console.log('id', this.id);
    this.getTag();
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Tag';
    } else {
      return 'Add Tag';
    }
  }

  getTag(): void {
    if (this.id) {
      this.service.getTag(this.id)
      .then(tag => this.tag = tag)
      .catch(err => console.error(err));
    }
  }

  checkName($event): void {
    const name = $event.target.value;
    this.service.getTagByName(name)
    .then(resp => {
      if (resp) {
        this.nameExists = true;
      } else {
        this.nameExists = false;
      }
    });
  }


  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.service.saveTag(this.tag)
    .then(() => {
      this.router.navigate(['/tags']);
      this.globalNotificationService.add(MESSAGES.addTag);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

}

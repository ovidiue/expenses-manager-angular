import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../models/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TagDetailDataService} from './tag-detail-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailComponent implements OnInit, OnDestroy {
  pageTitle: string;
  tag = new Tag();
  nameExists: boolean;
  isEditScreen: boolean;

  private paramSubscribtion: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private globalNotificationService: GlobalNotificationService,
    private service: TagDetailDataService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramSubscribtion = this.route.params
    .subscribe(param => {
      this.isEditScreen = param && param.id;
      this.pageTitle = this.isEditScreen ? 'Edit Tag' : 'Add Tag';
      if (this.isEditScreen) {
        this.getTag(param.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSubscribtion.unsubscribe();
  }

  getTag(tagId: number): void {
    this.service.getTag(tagId)
    .then(tag => this.tag = tag)
    .catch(err => console.error(err));
  }

  checkName($event): void {
    const name = $event.target.value;
    this.nameExists = false;
    this.service.getTagByName(name)
    .then((resp) => this.nameExists = !!resp);
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.service.saveTag(this.tag)
    .then(() => {
      const confirmMsg = this.isEditScreen ? MESSAGES.editTag : MESSAGES.addTag;
      this.router.navigate(['/tags']);
      this.globalNotificationService.add(confirmMsg);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

}

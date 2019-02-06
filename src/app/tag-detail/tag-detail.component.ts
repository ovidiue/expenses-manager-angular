import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../services/tag.service';
import {Location} from '@angular/common';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {fadeIn} from '../utils/animations/fadeIn';

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
              private tagService: TagService,
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
      this.tagService.getTag(this.id).then(tag => this.tag = tag).catch(err => console.error(err));
    }
  }

  checkName($event): void {
    console.log('checkcname', $event);
    const name = $event.target.value;
    this.tagService.getTagByName(name)
    .then(resp => {
      console.log('resp', resp);
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
    this.tagService.saveTag(this.tag)
    .then(() => {
      this.router.navigate(['/tags']);
      this.globalNotificationService.add(MESSAGES.addTag);
    })
    .catch(err => this.globalNotificationService.add(MESSAGES.error));
  }

}

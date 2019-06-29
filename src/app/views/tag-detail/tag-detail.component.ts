import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TagDetailDataService} from './tag-detail-data.service';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, flatMap, mergeMap, pluck} from 'rxjs/operators';
import {RoutePaths} from '../../models/interfaces';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailComponent implements OnInit, OnDestroy {
  pageTitle: string;
  nameExists: boolean;
  isEditScreen: boolean;
  tagFormControls: FormGroup;

  private paramSubscription: Subscription;
  private formSubscription: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private globalNotificationService: GlobalNotificationService,
    private service: TagDetailDataService,
    private route: ActivatedRoute
  ) {
    this.tagFormControls = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('lightgray')
    });
  }

  ngOnInit() {
    this.paramSubscription = this.route.params
    .pipe(
      flatMap(param => {
        this.isEditScreen = param && param.id || false;
        const obs = param.id ? param.id : new Observable();
        return obs;
      }),
      flatMap(id => this.service.getTag(parseInt(id.toString(), 10))),
    )
    .subscribe(tag => {
      this.tagFormControls.patchValue({
        name: tag.name,
        description: tag.description,
        color: tag.color
      });
    });

    this.formSubscription = this.tagFormControls.valueChanges
    .pipe(
      debounceTime(500),
      pluck('name'),
      mergeMap(name => this.service.getTagByName(name.toString())),
    )
    .subscribe(nameValue => {
      this.nameExists = !!nameValue;
    });

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.service.saveTag(this.tagFormControls.value)
    .subscribe(() => {
      const confirmMsg = this.isEditScreen ? MESSAGES.editTag : MESSAGES.addTag;
      this.router.navigate([RoutePaths.TAG_LISTING]);
      this.globalNotificationService.add(confirmMsg);
    }, () => this.globalNotificationService.add(MESSAGES.error));
  }

}

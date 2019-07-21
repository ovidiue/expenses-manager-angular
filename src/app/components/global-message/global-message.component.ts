import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GlobalNotificationService} from '../../services/global-notification.service';

@Component({
  selector: 'app-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss'], animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class GlobalMessageComponent implements OnInit {

  constructor(public globalNotification: GlobalNotificationService) {
  }

  ngOnInit() {
  }


}
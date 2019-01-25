import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TagsComponent implements OnInit {
  categories: Tag[] = [];
  selectedCat: Tag[] = [];

  constructor(private tagService: TagService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

}

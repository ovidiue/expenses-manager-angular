import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../tag.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {
  pageTitle: string;
  tag = new Tag();
  id: number;

  constructor(private location: Location,
              private router: Router,
              private tagService: TagService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    console.log('id', this.id);
    this.tagService.getTag(this.id).then(tag => this.tag = tag).catch(err => console.error(err));
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Tag';
    } else {
      return 'Add Tag';
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.tag);
    this.tagService.saveTag(this.tag);
    this.router.navigate(['/tags']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Card } from '@models/interfaces/card';
import { TagStatsDataService } from '@components/card-view-list/tag-stats-data.service';

@Component({
  selector: 'app-card-view-list',
  templateUrl: './card-view-list.component.html',
  styleUrls: ['./card-view-list.component.scss']
})
export class CardViewListComponent implements OnInit {
  stats: Card[];

  constructor(private service: TagStatsDataService) {
  }

  ngOnInit() {
    this.service.getCardStats().subscribe(resp => {
      console.log('resp', resp);
      this.stats = resp;
    });
  }

}

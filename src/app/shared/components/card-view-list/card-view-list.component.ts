import { Component, Input } from '@angular/core';
import { Card } from '@models/interfaces/card.interface';

@Component({
  selector: 'app-card-view-list',
  templateUrl: './card-view-list.component.html',
  styleUrls: ['./card-view-list.component.scss'],
})
export class CardViewListComponent {
  @Input() stats: Card[];
}

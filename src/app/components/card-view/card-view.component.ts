import { Component, Input, OnInit } from "@angular/core";
import { Card } from "@models/interfaces/card";

@Component({
  selector: "app-card-view",
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"]
})
export class CardViewComponent implements OnInit {
  @Input() data: Card;

  constructor() {
  }

  ngOnInit() {
  }
}

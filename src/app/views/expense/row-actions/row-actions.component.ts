import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-row-actions",
  templateUrl: "./row-actions.component.html",
  styleUrls: ["./row-actions.component.scss"]
})
export class AppRowActionsComponent {
  @Input() link;
  @Input() displayRates = false;
  @Output() clickEdit = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  @Output() clickRates = new EventEmitter();
}

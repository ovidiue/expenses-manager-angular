import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
  @Input() visible = false;
  @Input() message = '';
  @Input() threeButtons = false;
  @Input() okLabel = 'Delete';
  @Input() extraLabel = 'Delete also rates';

  @Output() clickOk = new EventEmitter();
  @Output() clickExtra = new EventEmitter();
  @Output() clickCancel = new EventEmitter();

  constructor() {
  }
}

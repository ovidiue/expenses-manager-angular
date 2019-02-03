import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalNotificationService {
  message: string;
  isOpen: boolean;

  constructor() {
  }

  add(msg: string): void {
    const self = this;
    this.isOpen = true;
    this.message = msg;
    setTimeout(function () {
      self.isOpen = false;
      self.clear();
    }, 3000);
  }

  clear(): void {
    this.message = null;
  }
}

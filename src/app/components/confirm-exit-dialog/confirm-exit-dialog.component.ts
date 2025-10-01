import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-exit-dialog',
  templateUrl: './confirm-exit-dialog.component.html',
  styleUrls: ['./confirm-exit-dialog.component.scss'],
  standalone: true,
})
export class ConfirmExitDialogComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  close(result: boolean) {
    this.confirmed.emit(result);
  }
}

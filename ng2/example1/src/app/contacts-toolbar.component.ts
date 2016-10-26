import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contacts-toolbar',
  template: `
    <div class="row">
      <div class="column column-100">
        <button class="button button-outline" (click)="add.emit()">Add</button>
      </div>
    </div>`
})
export class ContactsToolbarComponent {
  @Output() add: EventEmitter<void> = new EventEmitter<void>();
}

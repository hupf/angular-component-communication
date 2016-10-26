import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from './contact.model';

@Component({
  selector: 'contact-show',
  template: `
    <div class="container" *ngIf="contact">
      <div class="row">
        <div class="column column-50"><label>First name</label></div>
        <div class="column column-50">{{contact.first_name}}</div>
      </div>
      <div class="row">
        <div class="column column-50"><label>Last name</label></div>
        <div class="column column-50">{{contact.last_name}}</div>
      </div>
      <div class="row">
        <div class="column column-50"><label>Phone</label></div>
        <div class="column column-50">{{contact.phone}}</div>
      </div>
      <div class="row">
        <div class="column column-100">
          <button (click)="edit.emit()" class="button" type="button">Edit</button>
          <button (click)="destroy.emit()" class="button button-outline" type="button">Delete</button>
          <a routerLink="/contacts" class="button button-clear">Close</a>
        </div>
      </div>
    </div>`
})
export class ContactShowComponent {
  @Input() contact: ContactModel;
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() destroy: EventEmitter<void> = new EventEmitter<void>();
}

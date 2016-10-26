import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from './contact.model';

@Component({
  selector: 'contact-form',
  template: `
    <div class="container">
      <form name="contactForm" (ngSubmit)="submitForm($event)" novalidate>
        <div class="row">
          <div class="column column-100">
            <fieldset>
              <label>First name</label>
              <input type="text" name="first_name" [(ngModel)]="contact.first_name">
              <label>Last name</label>
              <input type="text" name="last_name" [(ngModel)]="contact.last_name">
              <label>Phone</label>
              <input type="text" name="phone" [(ngModel)]="contact.phone">
            </fieldset>
          </div>
        </div>
        <div class="row">
          <div class="column column-100">
            <button class="button" type="submit">Save</button>
            <button (click)="cancel.emit()" class="button button-clear" type="button">Cancel</button>
          </div>
        </div>
      </form>
    </div>`
})
export class ContactFormComponent {
  @Input() contact: ContactModel;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  submitForm(event) {
    event.preventDefault();
    this.submit.emit();
  }
}

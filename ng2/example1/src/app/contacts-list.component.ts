import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from './contact.model';

@Component({
  selector: 'contacts-list',
  template: `
    <table>
      <thead><tr><th>First name</th><th>Last name</th><th>Phone</th></tr></thead>
      <tbody>
        <tr *ngFor="let contact of contacts"
          (click)="selectContact.emit(contact)">
          <td>{{contact.first_name}}</td>
          <td>{{contact.last_name}}</td>
          <td>{{contact.phone}}</td>
        </tr>
      </tbody>
    </table>`
})
export class ContactsListComponent {
  @Input() contacts: ContactModel[];
  @Output() selectContact: EventEmitter<ContactModel> = new EventEmitter<ContactModel>();
}

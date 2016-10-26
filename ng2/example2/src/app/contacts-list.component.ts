import { Component, Input } from '@angular/core';
import { ContactModel } from './contact.model';

@Component({
  selector: 'contacts-list',
  template: `
    <table>
      <thead><tr><th>First name</th><th>Last name</th><th>Phone</th></tr></thead>
      <tbody>
        <tr *ngFor="let contact of contacts">
          <td><a [routerLink]="['/contacts', contact.id]">{{contact.first_name}}</a></td>
          <td><a [routerLink]="['/contacts', contact.id]">{{contact.last_name}}</a></td>
          <td><a [routerLink]="['/contacts', contact.id]">{{contact.phone}}</a></td>
        </tr>
      </tbody>
    </table>`
})
export class ContactsListComponent {
  @Input() contacts: ContactModel[];
}

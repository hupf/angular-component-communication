import { Component } from '@angular/core';
import { ContactModel } from './contact.model';
import { ContactsRestService } from './contacts-rest.service';

@Component({
  selector: 'contacts',
  template: `
    <div class="container">
      <div class="row">
        <div class="column column-100">
          <h2>Contacts</h2>
        </div>
      </div>
      <contacts-toolbar (add)="add()"></contacts-toolbar>
      <contacts-list
        [contacts]="contacts"
        (selectContact)="selectContact($event)"></contacts-list>
    </div>
    <contact-panel *ngIf="selectedContact"
      [contact]="selectedContact"
      (saved)="saved($event)"
      (destroyed)="destroyed($event)"
      (close)="selectContact()"></contact-panel>`
})
export class ContactsComponent {
  contacts: ContactModel[] = [];
  selectedContact: ContactModel;

  constructor(private contactsService: ContactsRestService) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getList().subscribe(contacts => {
      this.contacts = contacts
    });
  }

  selectContact(contact?: ContactModel) {
    this.selectedContact = contact;
  }

  add() {
    this.selectContact(new ContactModel())
  }

  saved(contact: ContactModel) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      this.contacts.unshift(contact);
    }
  }

  destroyed(contact: ContactModel) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    this.selectContact();
  }
}

import { Component } from '@angular/core';
import { ContactModel } from './contact.model';
import { ContactsService } from './contacts.service';

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
      (destroy)="destroy($event)"
      (close)="selectContact()"></contact-panel>`
})
export class ContactsComponent {
  contacts: ContactModel[] = [];
  selectedContact: ContactModel;

  constructor(private contactsService: ContactsService) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getList().subscribe(contacts => this.contacts = contacts);
  }

  selectContact(contact?: ContactModel) {
    this.selectedContact = contact;
  }

  add() {
    this.selectContact(new ContactModel())
  }

  saved(contact: ContactModel) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index >= 0) {
      // this.contacts[index] = contact;
    } else {
      this.contacts.unshift(contact);
    }
  }

  destroy(contact: ContactModel) {
    this.contactsService.remove(contact.id).subscribe(() => {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      if (contact === this.selectedContact) {
        this.selectContact()
      }
    });
  }
}

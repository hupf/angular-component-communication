import { Component } from '@angular/core';
import { ContactModel } from './contact.model';
import { ContactsRestService } from './contacts-rest.service';
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
      <contacts-toolbar></contacts-toolbar>
      <contacts-list [contacts]="contacts"></contacts-list>
    </div>
    <router-outlet></router-outlet>`,
  providers: [ContactsService]
})
export class ContactsComponent {
  contacts: ContactModel[] = [];
  selectedContact: ContactModel;

  constructor(private contactsRestService: ContactsRestService,
              private contactsService: ContactsService) {
    this.loadContacts();

    this.contactsService.saved.subscribe(contact => this.saved(contact));
    this.contactsService.destroyed.subscribe(contact => this.destroyed(contact));
  }

  loadContacts() {
    this.contactsRestService.getList().subscribe(contacts => {
      this.contacts = contacts;
      this.contactsService.updateContacts(contacts);
    });
  }

  saved(contact: ContactModel) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      this.contacts.unshift(contact);
    }
  }

  destroyed(contact: ContactModel) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
  }
}

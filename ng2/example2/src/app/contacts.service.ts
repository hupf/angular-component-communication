import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactModel } from './contact.model';

@Injectable()
export class ContactsService {
  private contactsSource = new BehaviorSubject<ContactModel[]>(undefined);

  contacts$ = this.contactsSource.asObservable();
  saved: EventEmitter<ContactModel> = new EventEmitter<ContactModel>();
  destroyed: EventEmitter<ContactModel> = new EventEmitter<ContactModel>();

  updateContacts(contacts: ContactModel[]) {
    this.contactsSource.next(contacts);
  }
}

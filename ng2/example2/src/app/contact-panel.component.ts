import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactModel } from './contact.model';
import { ContactsRestService } from './contacts-rest.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'contact-panel',
  template: `
    <contact-show *ngIf="!formModel"
      [contact]="contact"
      (edit)="startEdit()"
      (destroy)="destroy()"></contact-show>
    <contact-form *ngIf="formModel"
      [contact]="formModel"
      (submit)="submit()"
      (cancel)="cancelEdit()"></contact-form>`
})
export class ContactPanelComponent /*implements OnInit, OnChanges*/ {
  contact: ContactModel;

  formModel: ContactModel;

  constructor(private contactsRestService: ContactsRestService,
              private contactsService: ContactsService,
              private router: Router,
              route: ActivatedRoute) {
    route.params.subscribe(params => this.loadContact(params['id']));
  }

  loadContact(id: string) {
    if (id === 'new') {
      this.contact = new ContactModel();
      this.startEdit();
    } else {
      this.contactsService.contacts$
        .filter(contacts => !!contacts)
        .subscribe(contacts => {
          this.contact = contacts.find(c => c.id.toString() === id);
        });
    }
  }

  startEdit() {
    this.formModel = JSON.parse(JSON.stringify(this.contact));
  }

  cancelEdit() {
    this.formModel = undefined;
    if (this.contact && this.contact.id == null) {
      this.closePanel();
    }
  }

  closePanel() {
    this.router.navigate(['/contacts']);
  }

  submit() {
    this.contactsRestService.save(this.formModel, this.contact).subscribe(contact => {
      this.contactsService.saved.emit(contact);
      this.formModel = undefined;
    });
  }

  destroy() {
    this.contactsRestService.remove(this.contact.id).subscribe(() => {
      this.closePanel();
      this.contactsService.destroyed.emit(this.contact);
    });
  }

}

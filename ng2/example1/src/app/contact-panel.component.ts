import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from './contact.model';
import { ContactsRestService } from './contacts-rest.service';

@Component({
  selector: 'contact-panel',
  template: `
    <contact-show *ngIf="!formModel"
      [contact]="contact"
      (edit)="startEdit()"
      (destroy)="destroy()"
      (close)="close.emit()"></contact-show>
    <contact-form *ngIf="formModel"
      [contact]="formModel"
      (submit)="submit()"
      (cancel)="cancelEdit()"></contact-form>`
})
export class ContactPanelComponent implements OnInit, OnChanges {
  @Input() contact: ContactModel;
  @Output() saved: EventEmitter<ContactModel> = new EventEmitter<ContactModel>();
  @Output() destroyed: EventEmitter<ContactModel> = new EventEmitter<ContactModel>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  formModel: ContactModel;

  constructor(private contactsService: ContactsRestService) {}

  ngOnInit() {
    if (this.contact.id == null && !this.formModel) {
      this.startEdit();
    }
  }

  ngOnChanges(changes) {
    if (changes.contact) {
      if (this.contact.id == null || this.formModel) {
        this.startEdit();
      }
    }
  }

  startEdit() {
    this.formModel = JSON.parse(JSON.stringify(this.contact));
  }

  cancelEdit() {
    this.formModel = undefined;
    if (this.contact && this.contact.id == null) {
      this.close.emit();
    }
  }

  submit() {
    this.contactsService.save(this.formModel, this.contact).subscribe(contact => {
      this.saved.emit(contact);
      this.formModel = undefined;
    });
  }

  destroy() {
    this.contactsService.remove(this.contact.id).subscribe(() => {
      this.destroyed.emit(this.contact);
    });
  }

}

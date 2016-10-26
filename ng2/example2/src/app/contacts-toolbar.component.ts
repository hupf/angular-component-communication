import { Component } from '@angular/core';

@Component({
  selector: 'contacts-toolbar',
  template: `
    <div class="row">
      <div class="column column-100">
        <a class="button button-outline" routerLink="/contacts/new">Add</a>
      </div>
    </div>`
})
export class ContactsToolbarComponent {}

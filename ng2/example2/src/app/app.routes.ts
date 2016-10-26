import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactPanelComponent } from './contact-panel.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactsComponent,
    children: [
      { path: '' },
      { path: ':id', component: ContactPanelComponent }
    ]
  },
  { path: '**', redirectTo: '/contacts' }
];

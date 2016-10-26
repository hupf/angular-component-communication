import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: '**', redirectTo: '/contacts' }
];

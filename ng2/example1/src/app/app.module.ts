import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts.component';
import { ContactsListComponent } from './contacts-list.component';
import { ContactsToolbarComponent } from './contacts-toolbar.component';
import { ContactPanelComponent } from './contact-panel.component';
import { ContactShowComponent } from './contact-show.component';
import { ContactFormComponent } from './contact-form.component';
import { ContactsRestService } from './contacts-rest.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactsToolbarComponent,
    ContactPanelComponent,
    ContactShowComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ContactsRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionFormComponent } from './session-form/session-form.component';

import { FormsModule } from '@angular/forms';
import { ConferencePageComponent } from './conference-page/conference-page.component';
import { SessionListComponent } from './session-list/session-list.component';

@NgModule({
  declarations: [AppComponent, SessionFormComponent, ConferencePageComponent, SessionListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

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
import { SessionCardComponent } from './session-card/session-card.component';
import { HighlightDirective } from './directives/highlight.directive';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SessionFormComponent,
    ConferencePageComponent,
    SessionListComponent,
    SessionCardComponent,
    HighlightDirective,
    DurationPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

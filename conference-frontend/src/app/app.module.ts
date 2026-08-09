import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionFormComponent } from './pages/conference-create-page/session-form/session-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ConferencePageComponent } from './pages/conference-page/conference-page.component';
import { ConferenceCreatePageComponent } from './pages/conference-create-page/conference-create-page.component';
import { ConferenceDetailPageComponent } from './pages/conference-detail-page/conference-detail-page.component';

import { SessionListComponent } from './pages/conference-page/session-list/session-list.component';
import { SessionCardComponent } from './pages/conference-detail-page/session-card/session-card.component';
import { HighlightDirective } from './directives/highlight.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SessionFormComponent,
    ConferencePageComponent,
    SessionListComponent,
    SessionCardComponent,
    HighlightDirective,
    DurationPipe,
    ConferenceCreatePageComponent,
    ConferenceDetailPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ],
  bootstrap: [AppComponent],
})


export class AppModule {}

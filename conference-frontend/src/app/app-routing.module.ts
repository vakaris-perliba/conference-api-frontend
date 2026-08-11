import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferenceCreatePageComponent } from './pages/conference-create-page/conference-create-page.component';
import { ConferenceDetailPageComponent } from './pages/conference-detail-page/conference-detail-page.component';
import { ConferencePageComponent } from './pages/conference-page/conference-page.component';
import { conferenceExistsGuard } from './guards/conference-exists.guard';

const routes: Routes = [
  { path: 'conferences', component: ConferencePageComponent},
  { path: 'conferences/new', component: ConferenceCreatePageComponent},
  { path: 'conferences/:id', component: ConferenceDetailPageComponent, canActivate: [conferenceExistsGuard]},
  { path: '', redirectTo: 'conferences', pathMatch: 'full' },
  { path: '**', redirectTo: 'conferences' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

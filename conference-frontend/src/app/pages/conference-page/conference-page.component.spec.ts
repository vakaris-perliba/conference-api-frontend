import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencePageComponent } from './conference-page.component';
import { AppModule } from '../../app.module';

describe('ConferencePageComponent', () => {
  let component: ConferencePageComponent;
  let fixture: ComponentFixture<ConferencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

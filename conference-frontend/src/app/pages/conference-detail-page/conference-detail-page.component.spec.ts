import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConferenceDetailPageComponent } from './conference-detail-page.component';

describe('ConferenceDetailPageComponent', () => {
  let component: ConferenceDetailPageComponent;
  let fixture: ComponentFixture<ConferenceDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceDetailPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

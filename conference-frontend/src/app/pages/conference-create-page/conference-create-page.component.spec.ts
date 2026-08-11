import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceCreatePageComponent } from './conference-create-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionFormComponent } from './session-form/session-form.component';

describe('ConferenceCreatePageComponent', () => {
  let component: ConferenceCreatePageComponent;
  let fixture: ComponentFixture<ConferenceCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReactiveFormsModule],
    declarations: [ConferenceCreatePageComponent, SessionFormComponent],
  }).compileComponents();

    fixture = TestBed.createComponent(ConferenceCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

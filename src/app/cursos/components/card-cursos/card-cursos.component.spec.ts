import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursosModule } from '../../cursos.module';

import { CardsCursosComponent } from './card-cursos.component';

describe('CardCursosComponent', () => {
  let component: CardsCursosComponent;
  let fixture: ComponentFixture<CardsCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsCursosComponent ],
      imports: [
        CursosModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCoursesComponent } from './detalle-cursos.component';

describe('DetailCoursesComponent', () => {
  let component: DetailCoursesComponent;
  let fixture: ComponentFixture<DetailCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

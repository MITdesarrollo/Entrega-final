import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursosModule } from '../../cursos.module';

import { AddCourseComponent } from './add-course.component';

describe('Pruebas unitarias de add-course', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ],
      imports: [
        CursosModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario se mantiene invalido cuando dejo sin engresar el dato nombre', () =>{
    const formulario = component.formulario;
    const comision = formulario.controls['comision'];
    comision.setValue('1234');
    expect(formulario.valid).toBeFalse();
  })
});

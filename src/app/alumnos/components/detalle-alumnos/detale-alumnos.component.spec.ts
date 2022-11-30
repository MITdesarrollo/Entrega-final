import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetalleAlumnosComponent } from './detale-alumnos.component';



describe('DetaleAlumnosComponent', () => {
  let component: DetalleAlumnosComponent;
  let fixture: ComponentFixture<DetalleAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlumnosComponent ],
      imports: [ ActivatedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

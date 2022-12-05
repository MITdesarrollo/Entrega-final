import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/login/models/sesion';
import { Alumno } from '../../models/alumnos';
import { AlumnosService } from '../../service/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss'],
})
export class EditarAlumnoComponent implements OnInit, OnDestroy {
  alumno!: Alumno;

  formularioAlumno!: FormGroup;
  id!: number;

  sesion!: Sesion;
  sesion$!: Observable<Sesion>;
  sesionSubcription!: Subscription;

  constructor(
    private alumnoService: AlumnosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService
  ) {
    this.activatedRoute.paramMap.subscribe((parametros) => {
      console.log(parametros);
      this.id = parseInt(parametros.get('id') || '');
      this.formularioAlumno = new FormGroup({
        dni: new FormControl(parametros.get('dni')),
        nombre: new FormControl(parametros.get('nombre')),
        apellido: new FormControl(parametros.get('apellido')),
        fechaNacimiento: new FormControl(parametros.get('fechaNacimiento')),
      });
    });
  }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.sesionSubcription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion)
    );
  }
  ngOnDestroy(): void {
    this.sesionSubcription.unsubscribe();
  }

  editarAlumno() {
    let c: Alumno = {
      id: this.id,
      dni: this.formularioAlumno.value.dni,
      nombre: this.formularioAlumno.value.nombre,
      apellido: this.formularioAlumno.value.apellido,
      fechaNacimiento: this.formularioAlumno.value.fechaNacimiento,
    };
    this.alumnoService.editarAlumno(c);

    let admin = this.sesion.usuarioActivo?.admin;
    if (admin) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tus datos fueron actualizados',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/students']);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tus datos fueron actualizados',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/students/alta-alumno']);
    }
  }
}

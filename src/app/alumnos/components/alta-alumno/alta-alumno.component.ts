import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../models/alumnos';
import { AlumnosService } from '../../service/alumnos.service';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/login/models/sesion';
import { Router } from '@angular/router';
import { Curso } from 'src/app/cursos/models/curso';
import { CursoService } from 'src/app/cursos/services/curso.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/login/models/usuario';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-alta-alumno',
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.scss'],
})
export class AltaAlumnoComponent implements OnInit, OnDestroy {
  deshabilitado: boolean = false;
  formularioAltaAlumno!: FormGroup;
  alumno!: Alumno;
  alumnos!: Alumno[];
  alumnoSubscription!: Subscription;
  alumno$!: Observable<Alumno[]>;

  sesion!: Sesion;
  sesion$!: any;
  sesionSubcription!: Subscription;

  usuario!: Usuario;

  usuarioSubcription!: Subscription;

  observableDataTraida$!: Observable<any>;
  alumnoData!: any;
  suscripcion!: Subscription;

  curso$!: Observable<Curso[]>;
  cursosSub!: Subscription;
  cursos!: Curso[];

  cursosInscriptos!: Curso[];
  dadoAlta!: boolean;

  constructor(
    private alumnoService: AlumnosService,
    private sesionService: SesionService,
    private router: Router,
    private cursoService: CursoService
  ) {
    this.formularioAltaAlumno = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.alumno$ = this.alumnoService.obtenerAlumnos();
    this.alumnoSubscription = this.alumno$.subscribe(
      (alumnos: Alumno[]) => (this.alumnos = alumnos)
    );

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.sesionSubcription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion)
    );

    this.observableDataTraida$ = this.alumnoService.obtenerAlumno(
      this.sesion.usuarioActivo?.usuario
    );
    this.suscripcion = this.observableDataTraida$.subscribe(
      (dataAlumno: Alumno[]) => {
        this.alumnoData = dataAlumno;
        this.alumnoData.length >= 1
          ? (this.dadoAlta = true)
          : (this.dadoAlta = false);
      }
    );

    this.curso$ = this.cursoService.obtenerCursos();
    this.cursosSub = this.curso$.subscribe(
      (curso: Curso[]) => (this.cursos = curso)
    );
  }

  ngOnDestroy() {
    this.alumnoSubscription.unsubscribe();
    this.sesionSubcription.unsubscribe();
    this.suscripcion.unsubscribe();
    this.cursosSub.unsubscribe();
  }

  altaAlumno() {
    this.deshabilitado = true;
    setTimeout(() => {
      this.deshabilitado = false;
    }, 3000);
    let idAlumno: number = Math.max.apply(
      null,
      this.alumnos.map((o) => o.id)
    );
    let nameUsuario: any = this.sesion.usuarioActivo?.usuario;

    let c: Alumno = {
      id: idAlumno + 1,
      dni: this.formularioAltaAlumno.value.dni,
      nombre: this.formularioAltaAlumno.value.nombre,
      apellido: this.formularioAltaAlumno.value.apellido,
      fechaNacimiento: this.formularioAltaAlumno.value.fechaNacimiento,
    };
    this.alumno = { ...c, nameUsuario };
    this.alumnoService.agregarAlumno(this.alumno);

    setTimeout(() => {
      this.observableDataTraida$.subscribe((dataAlumno: Alumno[]) => {
        this.alumnoData = dataAlumno;
        this.alumnoData.length >= 1
          ? (this.dadoAlta = true)
          : (this.dadoAlta = false);
      });
    }, 1000);
  }

  editarAlumno(alumno: any) {
    let datoAlumno = alumno[0];
    this.router.navigate(['students/edit-student', datoAlumno]);
  }

  verCurso() {
    let arrayCursos: any = [];
    this.cursos.map((curso: any) => {
      let nameCurso = curso;
      curso.inscriptos.map((inscriptos: any) => {
        if (inscriptos.id == this.alumnoData[0].id) {
          arrayCursos.push(nameCurso);
        } else {
          console.log('no coincide');
        }
      });
    });

    this.cursosInscriptos = arrayCursos;
  }

  bajaCurso(curso: string) {
    let cursoEncontrado: Curso | undefined | any = this.cursos.find(
      (el) => el.nombreCurso == curso
    );
    cursoEncontrado.inscriptos = cursoEncontrado?.inscriptos.filter(
      (el: Alumno) => el.nameUsuario != this.sesion.usuarioActivo?.usuario
    );
    this.cursoService.editarCurso(cursoEncontrado);
    this.verCurso();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Te diste de baja con exito',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

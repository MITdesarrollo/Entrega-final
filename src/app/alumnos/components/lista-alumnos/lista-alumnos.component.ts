import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumnos';
import { Observable, Subscription } from 'rxjs';
import { AlumnosService } from '../../service/alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/login/models/sesion';
import Swal from 'sweetalert2';
import { CursoService } from 'src/app/cursos/services/curso.service';
import { Curso } from 'src/app/cursos/models/curso';
@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  alumno!: Alumno;
  alumnos!: Alumno[];
  alumnosSubcription!: Subscription;
  alumnos$!: Observable<Alumno[]>;

  columnasAlumnos: string[] = [
    'id',
    'dni',
    'nombre/apellido',
    'fecha-nacimiento',
    'editar/borrar',
  ];

  dataSource: MatTableDataSource<Alumno>;

  sesion!: Sesion;
  sesion$!: any;
  sesionSubcription!: Subscription;

  curso$!: Observable<Curso[]>;
  cursosSub!: Subscription;
  cursos!: Curso[];

  cursosInscriptos!: any;
  observableDataTraida$!: Observable<any>;
  alumnoData!: Alumno[];
  suscripcion!: Subscription;
  constructor(
    private alumnoService: AlumnosService,
    private router: Router,
    private sesionService: SesionService,
    private cursoService: CursoService
  ) {
    this.alumnos$ = this.alumnoService.obtenerAlumnos();
    this.alumnosSubcription = this.alumnos$.subscribe(
      (alumnos: Alumno[]) => (this.alumnos = alumnos)
    );

    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.sesionSubcription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion)
    );
  }

  ngOnInit(): void {
    this.observableDataTraida$ = this.alumnoService.obtenerAlumno(
      this.sesion.usuarioActivo?.usuario
    );
    this.suscripcion = this.observableDataTraida$.subscribe(
      (dataAlumno: Alumno[]) => {
        this.alumnoData = dataAlumno;
      }
    );

    this.curso$ = this.cursoService.obtenerCursos();
    this.cursosSub = this.curso$.subscribe(
      (curso: Curso[]) => (this.cursos = curso)
    );
  }
  ngOnDestroy() {
    this.alumnosSubcription.unsubscribe();
    this.sesionSubcription.unsubscribe();
  }

  eliminarAlumno(id: number) {
    this.verCurso();
    this.alumnoService.eliminarAlumno(id);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Baja exitosa',
      showConfirmButton: false,
      timer: 1500,
    });
    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
    for (let i = 0; i < this.cursosInscriptos.length; i++) {
      this.bajaCurso(this.cursosInscriptos[i].nombreCurso);
    }
    
    this.alumnos = this.alumnos.filter(el => el.id !== id);
  }
  editarAlumno(alumno: Alumno) {
    this.router.navigate(['students/edit-student', alumno]);
  }

  verCurso() {
    let arrayCursos: any = [];
    this.cursos.map((curso: any) => {
      let nameCurso = curso;
      curso.inscriptos.map((inscriptos: any) => {
        if (inscriptos.id == this.alumnoData[0].id) {
          arrayCursos.push(nameCurso);
        } else {
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

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Te diste de baja con exito',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

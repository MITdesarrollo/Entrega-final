import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { SesionService } from '../../../core/services/sesion.service';
import { Sesion } from '../../../login/models/sesion';

@Component({
  selector: 'app-detail-courses',
  templateUrl: './detail-courses.component.html',
  styleUrls: ['./detail-courses.component.scss'],
})
export class DetailCoursesComponent implements OnInit, OnDestroy {
  curso$!: Observable<Curso>;
  cursosSub!: Subscription;
  curso!: Curso;

  sesion$!: Observable<Sesion>;
  subscription!: Subscription;
  sesion!: Sesion;

  constructor(
    private activaRoute: ActivatedRoute,
    private cursoService: CursoService,
    private sesionService: SesionService
  ) {}

  ngOnInit(): void {
    this.activaRoute.paramMap.subscribe((parametros) => {
      
      let id = parseInt(parametros.get('id') || '0');
      this.curso$ = this.cursoService.obtenerCurso(id);
    });
    this.cursosSub = this.curso$.subscribe(
      (curso: Curso) => (this.curso = curso)
    );

    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion)
    );
  }
  ngOnDestroy() {
    this.cursosSub.unsubscribe();
  }

  bajaAlumno(id: number) {
    this.curso.inscriptos = this.curso.inscriptos?.filter(
      (idInscripto) => idInscripto.id != id
    );
    
    this.cursoService.editarCurso(this.curso);
  }
}

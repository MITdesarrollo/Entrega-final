import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Alumno } from '../../models/alumnos';
import { AlumnosService } from '../../service/alumnos.service';

@Component({
  selector: 'app-detale-alumnos',
  templateUrl: './detale-alumnos.component.html',
  styleUrls: ['./detale-alumnos.component.scss'],
})
export class DetalleAlumnosComponent implements OnInit {
  alumno$!: Observable<Alumno>
  alumnoSub!: Subscription;
  alumno!: Alumno;
  constructor(
    private activateRoute: ActivatedRoute,
    private alumnoService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((parametros) => {
      let id = parseInt(parametros.get('id') || '0');
      this.alumno$ = this.alumnoService.obtenerAlumnoId(id);
      this.alumnoSub = this.alumno$.subscribe(
        (alumno: Alumno) => (this.alumno = alumno)
      );
    });
  }
}

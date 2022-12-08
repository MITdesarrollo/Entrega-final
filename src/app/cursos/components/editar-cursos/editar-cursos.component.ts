import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.scss'],
})
export class EditarCursosComponent implements OnInit {
  formulario!: FormGroup;
  id!: number;
  constructor(
    private activatedRouted: ActivatedRoute,
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe((parametros) => {
      
      this.id = parseInt(parametros.get('id') || '');
      this.formulario = new FormGroup({
        nombreCurso: new FormControl(parametros.get('nombreCurso')),
        comision: new FormControl(parametros.get('comision')),
        profesor: new FormControl(parametros.get('profesor')),
        inicio: new FormControl(parametros.get('fechaInicio')),
        fin: new FormControl(parametros.get('fechaFin')),
        inscripcionAbierta: new FormControl(
          parametros.get('inscripcionAbierta')
        ),
        img: new FormControl(parametros.get('img')),
      });
    });
  }

  editarCurso() {
    let c: Curso = {
      id: this.id,
      nombreCurso: this.formulario.value.nombreCurso,
      comision: this.formulario.value.comision,
      profesor: this.formulario.value.profesor,
      fechaInicio: this.formulario.value.fechaInicio,
      fechaFin: this.formulario.value.fechaFin,
      inscripcionAbierta: this.formulario.value.inscripcionAbierta,
      img: this.formulario.value.img,
    };
    this.cursoService.editarCurso(c);
    this.router.navigate(['/courses']);
  }
}

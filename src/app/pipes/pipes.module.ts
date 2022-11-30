import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroCursosPipe } from './filtro-cursos.pipe';
import { BooleanTextPipe } from './boolean-text.pipe';
import { ApellidoPipe } from './apellido.pipe';

@NgModule({
  declarations: [
    FiltroCursosPipe,
    BooleanTextPipe,
    ApellidoPipe
  ],
  exports: [
    ApellidoPipe,
    BooleanTextPipe,
    FiltroCursosPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }

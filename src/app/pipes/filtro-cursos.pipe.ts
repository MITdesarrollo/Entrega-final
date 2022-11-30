import { Pipe, PipeTransform } from '@angular/core';
import {Curso} from "../cursos/models/curso";

@Pipe({
  name: 'filtroCursos'
})
export class FiltroCursosPipe implements PipeTransform {

  transform(cursos: Curso[], filtro: string): Curso[] {
    return cursos.filter(
      curso => curso.nombreCurso.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        curso.comision.includes(filtro) ||
        curso.fechaInicio.getMonth() + 1 == parseInt(filtro)
    );

  }

}

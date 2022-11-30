import { Pipe, PipeTransform } from '@angular/core';
import {Alumno} from "../alumnos/models/alumnos";

@Pipe({
  name: 'apellido'
})
export class ApellidoPipe implements PipeTransform {

  /* pipe personalizado */
  transform(value: Alumno): string{

    return `${value.nombre} ${value.apellido}` ;
  }


}

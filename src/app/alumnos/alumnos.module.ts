import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import {SharedModule} from "../shared/shared.module";
import {PipesModule} from "../pipes/pipes.module";
import {AlumnosService} from "./service/alumnos.service";
import { DetalleAlumnosComponent } from './components/detalle-alumnos/detale-alumnos.component';
import { AltaAlumnoComponent } from './components/alta-alumno/alta-alumno.component';


@NgModule({
  declarations: [
    EditarAlumnoComponent,
    FormularioComponent,
    ListaAlumnosComponent,
    DetalleAlumnosComponent,
    AltaAlumnoComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    PipesModule
  ],
  providers: [
    AlumnosService
  ],
  exports: [
    AlumnosRoutingModule
  ]
})
export class AlumnosModule { }

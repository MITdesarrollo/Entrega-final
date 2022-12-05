import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaAlumnosComponent} from "./components/lista-alumnos/lista-alumnos.component";
import {FormularioComponent} from "./components/formulario/formulario.component";
import {EditarAlumnoComponent} from "./components/editar-alumno/editar-alumno.component";
import { DetalleAlumnosComponent } from './components/detalle-alumnos/detale-alumnos.component';
import { AltaAlumnoComponent } from './components/alta-alumno/alta-alumno.component';

const routes: Routes = [
  {path: '', children: [
      {path: '', component: ListaAlumnosComponent},
      {path: 'form', component: FormularioComponent},
      {path: 'edit-student', component: EditarAlumnoComponent},
      {path: 'alta-alumno', component: AltaAlumnoComponent},
      {path: ':id',component: DetalleAlumnosComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }

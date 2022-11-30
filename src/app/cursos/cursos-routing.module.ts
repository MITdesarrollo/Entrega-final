import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddCourseComponent} from "./components/add-course/add-course.component";
import {EditarCursosComponent} from "./components/editar-cursos/editar-cursos.component";
import {CardsCursosComponent} from "./components/card-cursos/card-cursos.component";
import { DetailCoursesComponent } from './components/detail-courses/detalle-cursos.component';

const routes: Routes = [
  {path: '',
  children: [
    {path: '', component: CardsCursosComponent},
    {path: 'add-course', component: AddCourseComponent},
    {path: 'edit-course', component: EditarCursosComponent},
    {path: ':id', component: DetailCoursesComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

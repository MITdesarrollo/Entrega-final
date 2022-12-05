import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/components/home/home.component";
import {PaginaNoEncontradaComponent} from "./core/components/pagina-no-encontrada/pagina-no-encontrada.component";
import {LoginComponent} from "./login/components/login/login.component";
import {AutenticacionGuard} from "./core/guards/autenticacion.guard";
import { RegisterComponent } from './login/components/register/register.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'courses', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),canActivate: [AutenticacionGuard]  },
  {path:'students', loadChildren: () => import('./alumnos/alumnos.module').then((m => m.AlumnosModule)),canActivate: [AutenticacionGuard] },
  {path:'home', component: HomeComponent, canActivate: [AutenticacionGuard]},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


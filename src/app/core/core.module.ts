import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import {RouterLinkWithHref} from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        HomeComponent,
        NavBarComponent,
        ToolbarComponent,
        PaginaNoEncontradaComponent
    ],
  exports: [
    NavBarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    SharedModule
  ]
})
export class CoreModule { }

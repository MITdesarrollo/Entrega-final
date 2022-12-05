import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import {RouterLinkWithHref} from "@angular/router";
import {SharedModule} from "../shared/shared.module";




@NgModule({
    declarations: [
        HomeComponent,
        PaginaNoEncontradaComponent,
        
    ],
  exports: [
  
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    SharedModule
  ]
})
export class CoreModule { }

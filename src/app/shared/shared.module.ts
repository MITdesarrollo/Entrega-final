import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanStyleDirective } from './directives/boolean-style.directive';
import { TitleStyleDirective } from './directives/title-style.directive';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BooleanStyleDirective,
    TitleStyleDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BooleanStyleDirective,
    TitleStyleDirective,
    HttpClientModule
  ]
})
export class SharedModule { }

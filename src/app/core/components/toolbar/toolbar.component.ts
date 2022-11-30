import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/login/models/usuario';
import { SesionService } from '../../services/sesion.service';
import {Sesion} from 'src/app/login/models/sesion'
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  sesion!: Sesion;
  sesion$!: Observable<Sesion>;
  usuarioSubscription!: Subscription;
  
 
  constructor(
    private sesionService: SesionService
  ) {
  this.sesion$ = this.sesionService.obtenerDatosSesion();
  this.usuarioSubscription = this.sesion$.subscribe((sesion: Sesion)=> this.sesion = sesion) 
}

  ngOnInit(): void {
  }

  
}

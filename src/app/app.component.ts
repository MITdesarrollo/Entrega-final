import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from './core/services/sesion.service';
import { Sesion } from './login/models/sesion';
import { Usuario } from './login/models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mariel-Torres-Angular';
  usuario!: Usuario

  sesion$!: Observable<Sesion>
  subscription!: Subscription
  sesion!: Sesion
  constructor(
    private sesionService : SesionService
  ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe((sesion: Sesion)=> this.sesion = sesion)
  }
}

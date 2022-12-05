import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SesionService } from './core/services/sesion.service';
import { Sesion } from './login/models/sesion';
import { Usuario } from './login/models/usuario';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
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
    private sesionService : SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe((sesion: Sesion)=> this.sesion = sesion)
  }
  copie(){
    Swal.fire({
      color: '#20c997',
      position: 'bottom-start',
      title: '¡Email copiado!',
      showConfirmButton: false,
      timer: 1500,
      width: '13em',
      heightAuto: true,
      customClass: 'email-alert'
    })
  }
  logOut(){
    this.sesion.sesionActiva = false
    this.sesion.usuarioActivo = {admin: false, id: -1, contrasena: '', usuario: ''}
    this.router.navigate(['/register'])
    

  }
}

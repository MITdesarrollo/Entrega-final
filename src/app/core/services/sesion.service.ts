import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Sesion } from '../../login/models/sesion';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesionSubject: ReplaySubject<Sesion> = new ReplaySubject();

  constructor() {
    let sesion: Sesion;
    const sesionGuardada = localStorage.getItem('sesion');
    if (sesionGuardada) {
      sesion = JSON.parse(sesionGuardada);
    } else {
      sesion = {
        sesionActiva: false,
      };
    }
    this.sesionSubject.next(sesion);
  }

  login(usuario: string, contrasena: string, admin: boolean, id: number) {
    const sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: {
        id: id,
        usuario: usuario,
        contrasena: contrasena,
        admin: admin,
      },
    };
    localStorage.setItem('sesion', JSON.stringify(sesion));
    this.sesionSubject.next(sesion);
  }

  obtenerDatosSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }

  /*  logOut(usuario: string, contrasena: string, admin: boolean, id: number){
    const sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: {
        id: id,
        usuario: usuario,
        contrasena: contrasena,
        admin: admin,
      }
    }
    let datos= sesion.sesionActiva= false
    return datos
  } */
}

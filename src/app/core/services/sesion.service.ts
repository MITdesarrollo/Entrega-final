import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Sesion} from "../../login/models/sesion";

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  sesionSubject!: BehaviorSubject<Sesion>
  constructor() {
    const sesion: Sesion = {
      sesionActiva: false
    }
    this.sesionSubject = new BehaviorSubject(sesion)
  };


  login(usuario: string, contrasena: string, admin: boolean, id: number){

    const sesion: Sesion = {

      sesionActiva: true,

      usuarioActivo: {
        id: id,
        usuario: usuario,
        contrasena: contrasena,
        admin: admin,

      }
    }
    this.sesionSubject.next(sesion);
  }

  obtenerDatosSesion(): Observable<Sesion>{
    return this.sesionSubject.asObservable();
  }
}

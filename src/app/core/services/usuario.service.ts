import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subscription, throwError } from 'rxjs';
import { Usuario } from 'src/app/login/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  constructor(
    private http: HttpClient
  ) { 
    
  }

   obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`,{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'Utf-8'
      })
    })
  }
  
  obtenerUsuario(id: number): Observable<Usuario>{
    return  this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`,{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'Utf-8'
      })
    })
  };


  agregarUsuario(usuario: Usuario){
    this.http.post(`${environment.apiUrl}/usuarios`, usuario).subscribe();
  }

  
}

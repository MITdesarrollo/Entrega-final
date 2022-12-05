import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumnos';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${environment.apiUrl}/alumnos`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        encoding: 'Utf-8',
      }),
    });
  }
  obtenerAlumnoId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${environment.apiUrl}/alumnos/${id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        encoding: 'Utf-8',
      }),
    });
  }

  obtenerAlumno(userName: string | undefined): Observable<Alumno> {
    return this.http.get<Alumno>(
      `${environment.apiUrl}/alumnos?filter=${userName}`,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      }
    );
  }

  agregarAlumno(alumno: Alumno) {
    this.http
      .post(`${environment.apiUrl}/alumnos`, alumno)
      .pipe(catchError(this.manejoError))
      .subscribe();
  }

  eliminarAlumno(id: number) {
    this.http
      .delete<Alumno>(`${environment.apiUrl}/alumnos/${id}`)
      .pipe(catchError(this.manejoError))
      .subscribe();
  }

  editarAlumno(alumno: Alumno) {
    this.http
      .put<Alumno>(`${environment.apiUrl}/alumnos/${alumno.id}`, alumno)
      .pipe(catchError(this.manejoError))
      .subscribe();
  }

  /* esto es para capturar los errores */

  private manejoError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('error del aldo del cliente', error.error.message);
    } else {
      console.warn('error del aldo del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicacion HTTP'));
  }
}

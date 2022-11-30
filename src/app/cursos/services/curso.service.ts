import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { BehaviorSubject, catchError, concatMap, map, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient) {}

  /* observable */
  obtenerCursos(): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(`${environment.apiUrl}/curso`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.manejoError));
  }

  obtenerCurso(id: number): Observable<Curso> {
    return this.http
      .get<Curso>(`${environment.apiUrl}/curso/${id}`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.manejoError));
  }

  agregarCurso(curso: Curso) {
    this.http
      .post(`${environment.apiUrl}/curso`, curso)
      .pipe(catchError(this.manejoError))
      .subscribe();
  }

  editarCurso(curso: Curso) {
    this.http
      .put<Curso>(`${environment.apiUrl}/curso/${curso.id}`, curso)
      .pipe(catchError(this.manejoError))
      .subscribe();
    /* poner alerta */
  }

  eliminarCurso(id: number) {
    return this.http
      .delete<Curso>(`${environment.apiUrl}/curso/${id}`)
      .pipe(
        concatMap(() => this.obtenerCursos())
      )
    /* poner alerta */
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

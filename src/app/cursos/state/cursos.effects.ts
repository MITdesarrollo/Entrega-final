import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursoService } from '../services/curso.service';

@Injectable()
export class CursosEffects {
  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.loadCursoss),
      concatMap(() =>
        this.cursosService.obtenerCursos().pipe(
          map((cursos) => CursosActions.loadCursossSuccess({ cursos })),
          catchError((error) => of(CursosActions.loadCursossFailure({ error })))
        )
      )
    )
  );

  eliminarCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.eliminarCurso),
      concatMap((action) =>
        this.cursosService
          .eliminarCurso(action.curso.id)
          .pipe(map(() => CursosActions.loadCursoss()))
      )
    )
  );

  constructor(private actions$: Actions, private cursosService: CursoService) {}
}

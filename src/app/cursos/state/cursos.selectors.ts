import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';
import { CursoState } from '../models/curso.state';

export const selectCursosState = createFeatureSelector<CursoState>(
  fromCursos.cursosFeatureKey
);

export const selectCursosCargados = createSelector(
  selectCursosState,
  (state: CursoState) => state.cargando
)

export const selectCursos = createSelector(
  selectCursosState,
  (state: CursoState) => state.cursos
)
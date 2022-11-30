import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CursosEffects } from './cursos.effects';

describe('CursosEffects', () => {
  let actions$: Observable<any>;
  let effects: CursosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CursosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CursosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

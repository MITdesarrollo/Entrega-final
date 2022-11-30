import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { UsuarioService } from './usuario.service';
import { of } from 'rxjs';

describe('UsuarioService', () => {
  let httpClientSpy : {get : jasmine.Spy};
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UsuarioService(httpClientSpy as any);
  });

  it('El servicio se instancia', () => {
    expect(service).toBeTruthy();
  });

  
});

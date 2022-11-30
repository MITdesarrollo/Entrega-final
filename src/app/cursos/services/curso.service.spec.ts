import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CursoService } from './curso.service';

describe('CursoService', () => {
  let httpClientSpy : {get: jasmine.Spy}
  let service: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new CursoService(httpClientSpy as any);
  });

  it('se crea el servicio', () => {
    expect(service).toBeTruthy();
  });

 it('el servicio retorna curso mock', () => {
  const mockDatos = [
  {"nombre":"Angular","comision":"29025","profesor":"Luz","fechaInicio":"2021-11-14T12:56:02.566Z","fechaFin":"2023-08-24T07:34:11.969Z","inscripcionAbierta":"true","img":"/assets/images/2.png","id":"2"},
  {"nombre":"JavaScriptt","comision":"30160-2177","profesor":"Lincoln","fechaInicio":"2021-11-09T10:40:33.269Z","fechaFin":"2023-10-05T14:10:11.714Z","inscripcionAbierta":"true","img":"/assets/images/3.png","id":"3"},
  {"nombre":"Python","comision":"10468","profesor":"Erik","fechaInicio":"2022-04-03T06:51:32.905Z","fechaFin":"2023-10-11T21:06:56.182Z","inscripcionAbierta":false,"img":"/assets/images/4.png","id":"4"}
];
httpClientSpy.get.and.returnValue(of(mockDatos));
service.obtenerCursos().subscribe((cursos)=>{
  expect(cursos).toEqual(mockDatos as any);
})
 })
 
});

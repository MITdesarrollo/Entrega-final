export interface Curso{
  id: number;
  nombreCurso: string;
  comision: string;
  profesor: string;
  fechaInicio: Date;
  fechaFin: Date;
  inscripcionAbierta: boolean;
  img: string;
  inscriptos?: Array<any>
}


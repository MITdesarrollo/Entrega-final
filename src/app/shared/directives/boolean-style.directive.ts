import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBooleanStyle]'
})
export class BooleanStyleDirective {
  @Input('appBooleanStyle') inscripcionAbierta!: boolean

  constructor(
    /* son de angular core */
    /* elemnetRef hace referencia a la etiqueta en el dom */
    private elemento: ElementRef,/*
    y renderer para poder agregarle estilo */
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {

    this.renderer.setStyle(this.elemento.nativeElement, 'padding', '5px 10px 5px 10px')
    this.renderer.setStyle(this.elemento.nativeElement, 'border-radius', '40px')
    this.renderer.setStyle(this.elemento.nativeElement, 'color', '#ffffff')
    this.renderer.setStyle(this.elemento.nativeElement, 'background-color',
      this.inscripcionAbierta ? '#5CE1E6' : '#FFDE59')
  }

}

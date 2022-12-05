import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SesionService} from "../../../core/services/sesion.service";
import {Router} from "@angular/router";
import {UsuarioService} from 'src/app/core/services/usuario.service';
import {Usuario} from '../../models/usuario';
import {Observable, Subscription} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario: FormGroup

  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>
  subscription!: Subscription

  validacion!: Usuario

  constructor(
    private sesioService: SesionService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.email, Validators.required]),
      contrasena: new FormControl('', [Validators.required]),

    })
  }

  ngOnInit(): void {
    this.usuarios$ = this.usuarioService.obtenerUsuarios();
    this.subscription = this.usuarios$.subscribe(usuarios => this.usuarios = usuarios)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validacionUsuario() {
    const formUsuario = this.formulario.value.usuario;
    const formPass = this.formulario.value.contrasena;
    const encontrarUsuario = this.usuarios.find(el => el.usuario === formUsuario)

    if (encontrarUsuario != undefined) {
      if (encontrarUsuario?.contrasena === formPass) {
        this.validacion = encontrarUsuario
        this.sesioService.login(encontrarUsuario.usuario, encontrarUsuario.contrasena, encontrarUsuario.admin, encontrarUsuario.id);
        this.router.navigate(['/students/alta-alumno'])
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'contraseña incorrecta',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'usuario icorrecto',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}

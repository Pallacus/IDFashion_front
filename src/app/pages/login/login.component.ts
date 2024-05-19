import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [NavBarComponent, FooterComponent, ReactiveFormsModule],
})
export class LoginComponent {
  router = inject(Router);
  usuarioService = inject(UsuariosService);

  formularioLogin: FormGroup;
  route: string = '/home';

  demoMode = false; //! demo mode

  constructor() {
    this.formularioLogin = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.formularioLogin.valid) {
      try {
        const response: any = await this.usuarioService.login(this.formularioLogin.value);

        if (response.success) {

          localStorage.setItem('token', response.token);
          const decodedToken: any = jwtDecode(response.token);

          const userData = await this.usuarioService.getById(decodedToken.id);

          if (decodedToken.role === "admin") {
            this.route = '/dashboard';
          }

          Swal.fire({
            title: 'Success!',
            text: `Welcome ${userData.name}`,
          });
          this.formularioLogin.reset();
          this.router.navigateByUrl(this.route);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'The email and/or password are incorrect',
            icon: 'error',
          });
        }
      } catch (error) {
        Swal.fire('Error', 'Se ha producido un error.');
      }
    } else {
      Swal.fire('Error', 'Please complete the form correctly.', 'error');
    }

  }

  //!   DEMO MODE
  user() {
    const user: any = { email: 'ashley@example.com', password: '123456' };
    this.formularioLogin.setValue(user);
    this.onSubmit();
  }
  admin() {
    const user: any = { email: 'jennifer@example.com', password: '12345' };
    this.formularioLogin.setValue(user);
    this.onSubmit();
  }
  toggleDemoMode() {
    this.demoMode = !this.demoMode;
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [FormsModule, ReactiveFormsModule, FooterComponent, NavBarComponent]
})
export class RegisterComponent {

    formulario: FormGroup;

    usuarioService = inject(UsuariosService);
    router = inject(Router);

    constructor() {
      this.formulario = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
        ]),
        last_name: new FormControl(null, [
          Validators.required,
        ]),
        address: new FormControl(null, [
          Validators.required,
        ]),
        email: new FormControl(null, [
          Validators.required,
        ]),
        card_number: new FormControl(null, [
          Validators.required,
        ]),
        password: new FormControl(null, [
          Validators.required,
        ]),
        role: new FormControl('user', [
          Validators.required,
        ]),

      });

  }
  
  async onSubmit() {
    if (this.formulario.valid) {
      try {
        const response: any = await this.usuarioService.create(this.formulario.value);  
        
        if (response.fatal) {
          Swal.fire('Error', `This user already exists.`);
          return;
        } else {
          Swal.fire(`The User ${response.name} se ha registrado.`)
        }
        this.formulario.reset();
        this.router.navigateByUrl('/login');  
      } catch (error) {
        Swal.fire(
          'Error!',
          `An error has occurred with the server. We apologize for the inconvenience.`,
          'error'
        );
        this.formulario.reset();
      }
    } else {
      Swal.fire('Error', 'Please complete the form correctly.', 'error');
    }
  }

}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  
  clave: string = '';
  tipoUsuario!: Number;

  private fb = inject(FormBuilder);
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService, 
              private router: Router,
              private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.initForm();
  }



  initForm(){
    this.loginForm = this.fb.group({
      usuario: ['',Validators.required],
      clave: ['',Validators.required],
    });
  }

  
  async onLogin() {
    const { usuario, clave } = this.loginForm.value;

    this.authService.login({usuario, clave}).subscribe(
      async (response) => {

        if (response.success) {
          const idUsuario = response.id_usuario;
          console.log(response);
          this.tipoUsuario = response.usuarioLvl; // Obtenemos el tipo de usuario desde la respuesta
          console.log(response.id_usuario);
          console.log('Inicio de sesión exitoso');
          // Navegar a la página de productos con query params
        this.router.navigate(['/productos'], { queryParams: { id_usuario: idUsuario } });


        } else {
          this.presentToast('Usuario o contraseña incorrectos');
          console.log('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        this.presentToast('Error en el inicio de sesión');
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
  


  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}

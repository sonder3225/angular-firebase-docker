import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true, // 👈 importante: sin esto, no funcionará en el sistema standalone
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="max-width: 400px; margin: 40px auto; text-align: center;">
      <h2>Registro de Usuario</h2>

      <div
        *ngIf="error"
        style="color: red; padding: 10px; border: 1px solid red; margin-bottom: 10px;"
      >
        {{ error }}
      </div>

      <input
        type="email"
        placeholder="Correo Electrónico"
        [(ngModel)]="emailAddress"
        name="email"
      />
      <br /><br />

      <input
        type="password"
        placeholder="Contraseña (mínimo 6 caracteres)"
        [(ngModel)]="password"
        name="password"
      />
      <br /><br />

      <button (click)="onSignUpPress()">Registrarse</button>

      <p style="margin-top: 15px;">
        ¿Ya tienes cuenta?
        <a routerLink="/login">Inicia Sesión</a>
      </p>
    </div>
  `,
})
export class SignupComponent {
  emailAddress: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) {}

  async onSignUpPress(): Promise<void> {
    this.error = '';
    try {
      await createUserWithEmailAndPassword(this.auth, this.emailAddress, this.password);
      this.router.navigate(['/']);
    } catch (firebaseError: any) {
      if (firebaseError.code === 'auth/weak-password') {
        this.error = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (firebaseError.code === 'auth/email-already-in-use') {
        this.error = 'Este correo ya está registrado.';
      } else {
        this.error = 'Ocurrió un error al intentar registrarse.';
      }
    }
  }
}

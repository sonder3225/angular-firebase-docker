import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // 👈 importante para el sistema standalone
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="max-width: 400px; margin: 40px auto; text-align: center;">
      <h2>Iniciar Sesión</h2>

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

      <input type="password" placeholder="Contraseña" [(ngModel)]="password" name="password" />
      <br /><br />

      <button (click)="onSignInPress()">Continuar</button>

      <p style="margin-top: 15px;">
        ¿No tienes cuenta?
        <a routerLink="/signup">Regístrate</a>
      </p>
    </div>
  `,
})
export class LoginComponent {
  emailAddress: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignInPress(): Promise<void> {
    this.error = '';

    const success = await this.authService.login(this.emailAddress, this.password);
    if (!success) {
      this.error = 'Credenciales incorrectas o usuario no existe.';
    } else {
      // 🔹 Redirige al Home después del login exitoso
      this.router.navigate(['/']);
    }
  }
}

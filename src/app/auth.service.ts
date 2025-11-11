// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user, // Observable de Firebase para el estado del usuario
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Solo se declaran las propiedades. La inicialización ocurre en el constructor.
  public isAuthenticated$: Observable<boolean>;
  public userEmail$: Observable<string | null>;
  private firebaseUser$: Observable<any>; // Nueva declaración

  // 🚨 Inyectamos el Router y el módulo Auth de Firebase 🚨
  constructor(private router: Router, private auth: Auth) {
    // ⬇️ INICIALIZACIÓN MOVILIZADA AQUÍ (Donde this.auth ya existe) ⬇️
    this.firebaseUser$ = user(this.auth);

    // Mapear el Observable de Firebase: ¿Existe el usuario?
    this.isAuthenticated$ = this.firebaseUser$.pipe(map((user) => !!user));

    // Mapear el Observable de Firebase: ¿Cuál es el correo?
    this.userEmail$ = this.firebaseUser$.pipe(map((user) => (user ? user.email : null)));
    // ⬆️ FIN DE LA INICIALIZACIÓN ⬆️
  }

  // LOGIN
  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  // LOGOUT
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

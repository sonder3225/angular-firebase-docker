// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component'; // Ruta relativa correcta desde src/app/signup
import { LoginComponent } from '../login/login.component'; // Asegúrate de que la ruta sea correcta
import { AuthGuard } from './auth.guard'; // Importar el Guardián

const routes: Routes = [
  // Ruta de Login (Pública)
  { path: 'login', component: LoginComponent },

  // Ruta Principal (Protegida)
  // El path '' es la raíz de la aplicación (similar a la ruta protegida en tus archivos Clerk)
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // Redirigir cualquier otra cosa a la principal
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

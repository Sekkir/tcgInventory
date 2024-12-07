import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://betcgestadio-production.up.railway.app/api';
  private tokenKey = 'auth_token'; // Clave para almacenar el token en localStorage


  constructor(private http: HttpClient, private router: Router) { }

  // Método para realizar el login
  login(credentials: { usuario: string, clave: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

    // Método para almacenar el token en localStorage
    saveToken(token: string): void {
      localStorage.setItem(this.tokenKey, token);
    }

      // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

    // Método para decodificar el token y obtener el id_usuario
    getDecodedToken(): any {
      const token = this.getToken();
      if (token) {
        return jwt_decode.jwtDecode(token); // Decodifica el JWT y devuelve el payload
      }
      return null;
    }


      // Método para verificar si el usuario está logueado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.getDecodedToken();
      return decodedToken != null && decodedToken.id_usuario ? true : false;
    }
    return false;
  }

    // Método para cerrar sesión (eliminar el token)
    logout(): void {
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login']); // Redirige a la página de login
    }
}


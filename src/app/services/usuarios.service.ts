import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../data/interfaces/usuario.interface';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

export type JwtPayloadCustom = JwtPayload & { role: string, id: string };

type RegisterResponse = {
  success?: string,
  error?: string
}
type LoginType = { email: string, password: string }
type LoginResponse = {
  success?: string,
  token?: string,
  error?: string
}

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  
  private baseUrl = `${environment.apiUrl}/users`;

  private httpClient = inject(HttpClient);

  getAll() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  getById(user_id: number) {
    return firstValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${user_id}`));
  }

  create(newUser: User) {
    return firstValueFrom(
      this.httpClient.post<RegisterResponse>(`${this.baseUrl}/new`, newUser));
  }

  login(values: LoginType) {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, values));
  }

  getUserByEmail(email: string) {
    return firstValueFrom(this.httpClient.get<User>(`${this.baseUrl}/email/${email}`));
  }

  isLogged() {
    return localStorage.getItem('token') ? true : false;
  }

  isAdmin() {
    if (!localStorage.getItem('token')) {
      return false;
    }
    // El rol del usuario está codificado dentro del TOKEN
    const decoded: JwtPayloadCustom = jwtDecode(localStorage.getItem('token')!);
    return (decoded.role === 'admin');
  }
}

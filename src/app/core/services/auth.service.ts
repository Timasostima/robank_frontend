import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from '@angular/fire/auth';
import {lastValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/user';

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  // Sign in with Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  getProfile(): Observable<any> {
    const url = `${this.BASE_URL}/profile`;
    return this.http.get(url);
  }

  // Fetch Firebase JWT Token (for sending to backend)
  async getToken(): Promise<string | null> {
    console.log('getToken');
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  registerBackend(user: any): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return lastValueFrom(this.http.post(url, user));
  }
}

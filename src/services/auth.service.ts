import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, authState, User } from '@angular/fire/auth';
import {lastValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);

  // Sign in with email & password
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Sign up with email & password
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Sign out
  signOut() {
    return signOut(this.auth);
  }

  // Sign in with Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  getProfile(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/user/profile`);
  }

  // Fetch Firebase JWT Token (for sending to backend)
  async getToken(): Promise<string | null> {
    console.log('getToken');
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  registerBackend(user: any): Promise<any> {
    return lastValueFrom(this.http.post(`http://localhost:8080/api/user/register`, user));
  }
}

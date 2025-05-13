import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  async logIn(email: string, password: string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('pfp');
    return signOut(this.auth);
  }

  async LogInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(this.auth, provider);
    return user;
  }

  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  registerBackend(user: any): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, user).toPromise();
  }
}

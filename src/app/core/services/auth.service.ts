import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  logIn(email: string, password: string) {
    const user =  signInWithEmailAndPassword(this.auth, email, password);
    this.isLoggedInSubject.next(true);
    return user;
  }

  async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    this.isLoggedInSubject.next(true);
    return user;
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.isLoggedInSubject.next(false);
    });
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    this.isLoggedInSubject.next(true);
  }

  getProfile(): Observable<any> {
    const url = `${this.BASE_URL}/profile`;
    return this.http.get(url);
  }

  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? await user.getIdToken() : null;
  }

  isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return !!user;
  }

  registerBackend(user: any): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return lastValueFrom(this.http.post(url, user));
  }
}

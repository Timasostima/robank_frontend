import {Injectable, inject} from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, sendPasswordResetEmail
} from '@angular/fire/auth';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private BASE_URL = `${environment.apiUrl}/user`;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  async waitForAuthState(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });
  }

  async logIn(email: string, password: string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async fetchUserPreferences(): Promise<any> {
    const url = `${this.BASE_URL}/preferences`;

    try {
      return await firstValueFrom(this.http.get<any>(url));
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  }

  async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  registerBackend(user: any): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, user).toPromise();
  }

  logout() {
    const isDarkTheme = localStorage.getItem('isdarktheme');
    localStorage.clear();
    
    if (isDarkTheme) {
      localStorage.setItem('isdarktheme', isDarkTheme);
    }

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

  async uploadImageUrl(imageUrl: string): Promise<void> {
    const url = `${this.BASE_URL}/upload-pfp-firebase`;
    const body = {imageUrl};

    await firstValueFrom(this.http.post(url, body));
  }

  async fetchUserImage(): Promise<string> {
    const url = `${this.BASE_URL}/pfp`;

    const blob = await firstValueFrom(this.http.get(url, {responseType: 'blob'})) as Blob;
    return URL.createObjectURL(blob);
  }

  async uploadProfilePicture(file: File): Promise<void> {
    const url = `${this.BASE_URL}/upload-pfp`;

    const formData = new FormData();
    formData.append('file', file);

    await firstValueFrom(this.http.post(url, formData));
  }

  async checkNewUser(uid: string): Promise<boolean> {
    const url = `${this.BASE_URL}/check-new-user?userId=${encodeURIComponent(uid)}`;

    try {
      const response = await firstValueFrom(this.http.get<{ exists: boolean }>(url));
      return response.exists;
    } catch (error) {
      console.error('Error checking new user:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    if (!email) {
      throw new Error('Email is required to reset the password.');
    }
    await sendPasswordResetEmail(this.auth, email);
  }
}

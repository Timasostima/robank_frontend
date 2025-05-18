import {Component, EventEmitter, inject, Output} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router"
import {AuthService} from '../../core/services/auth.service';
import {routes} from '../../app.routes';
import {PopupComponent} from '../../shared/popup/popup.component';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PopupComponent, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;
  isPopupOpen = false;
  resetEmail = "";
  authService = inject(AuthService);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get form() {
    return this.loginForm.controls
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  // Login form
  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.authService.logIn(this.form["email"].value, this.form["password"].value)
      .then(async response => {
        console.log('Firebase login successful:', response)
        localStorage.setItem('name', response.user.displayName || response.user.email?.split("@")[0] || 'Unknown');
        localStorage.setItem('email', response.user.email || 'Unknown');

        try {
          const preferences = await this.authService.fetchUserPreferences();
          this.storePreferences(preferences);
        } catch (error) {
          console.error('Error fetching preferences:', error);
          this.setDefaultPreferences();
        }

        this.router.navigate(['/dashboard'])
      })
      .catch(err => console.error("Login failed", err));
  }

  private storePreferences(preferences: any): void {
    localStorage.setItem('theme', preferences.theme || 'light');
    localStorage.setItem('currency', preferences.currency || 'USD');

    // Set currency symbol based on currency type
    if (preferences.currency === 'rub') {
      localStorage.setItem('currencySymbol', '₽');
    } else if (preferences.currency === 'usd') {
      localStorage.setItem('currencySymbol', '$');
    } else if (preferences.currency === 'eur') {
      localStorage.setItem('currencySymbol', '€');
    } else {
      localStorage.setItem('currencySymbol', '$');
    }

    localStorage.setItem('language', preferences.language || 'en');
    localStorage.setItem('notifications', String(preferences.notifications || false));

    console.log("Pref theme: " + preferences.theme);
    let isDarkTheme = false;

    if (preferences.theme === 'system') {
      isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log("System preference is dark: " + isDarkTheme);
    } else {
      isDarkTheme = preferences.theme === 'night';
    }

    console.log("Using dark theme: " + isDarkTheme);

    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }

    localStorage.setItem('isdarktheme', String(isDarkTheme));
  }

  private setDefaultPreferences(): void {
    localStorage.setItem('theme', 'system');
    localStorage.setItem('currency', 'eur');
    localStorage.setItem('currencySymbol', '€');
    localStorage.setItem('language', 'en');
    localStorage.setItem('notifications', 'false');
    localStorage.setItem('isdarktheme', 'false');
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  }

  LoginGoogle() {
  this.authService.LogInWithGoogle()
    .then(async (response) => {
      const exists = await this.authService.checkNewUser(response.user.uid);
      if (!exists) {
        const usrObj = {
          uid: response.user.uid,
          email: response.user.email,
          name: response.user.displayName || "alex",
        };
        await this.authService.registerBackend(usrObj);
        if (response.user.photoURL) {
          await this.authService.uploadImageUrl(response.user.photoURL);
        }
      }

      localStorage.setItem('name', response.user.displayName || response.user.email?.split("@")[0] || 'Unknown');
      localStorage.setItem('email', response.user.email || 'Unknown');

      // Fetch and store preferences
      try {
        const preferences = await this.authService.fetchUserPreferences();
        this.storePreferences(preferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
        this.setDefaultPreferences();
      }

      this.router.navigate(['/dashboard']);
    })
    .catch((err) => console.error("Login with Google failed", err));
}

  openForgotPasswordPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.resetEmail = "";
  }

  sendPasswordReset() {
    if (!this.resetEmail) {
      alert("Please enter a valid email.");
      return;
    }

    this.authService
      .resetPassword(this.resetEmail)
      .then(() => {
        alert("Password reset link sent to your email.");
        this.closePopup();
      })
      .catch((err) => {
        console.error("Failed to send password reset link:", err);
        alert("Failed to send password reset link. Please try again.");
      });
  }
}

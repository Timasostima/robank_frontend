import {Component, EventEmitter, inject, Output} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router"
import {AuthService} from '../../core/services/auth.service';
import {routes} from '../../app.routes';
import {PopupComponent} from '../../shared/popup/popup.component';
import {NotificationComponent} from '../../shared/notification/notification.component';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PopupComponent, FormsModule, NotificationComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;
  isPopupOpen = false;
  resetEmail = "";
  errorMessage: string = "";
  authService = inject(AuthService);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // this.loginForm = this.formBuilder.group({
    //   email: ["", [Validators.required, Validators.email]],
    //   password: ["", [Validators.required, Validators.minLength(6)]],
    // });
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""],
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
      .then(async user => {
        localStorage.setItem('name', user.displayName || user.email?.split("@")[0] || 'Unknown');
        localStorage.setItem('email', user.email || 'Unknown');

        try {
          const preferences = await this.authService.fetchUserPreferences();
          this.storePreferences(preferences);
        } catch (error) {
          console.error('Error fetching preferences:', error);
          this.setDefaultPreferences();
        }

        alert("Login successful!");
        this.router.navigate(['/dashboard'])
      })
      .catch((err) => {
        console.error('Login failed', err);
        this.errorMessage = ''; // Reset the error message
        setTimeout(() => {
          this.errorMessage = err.message; // Set the new error message
        });
      });
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

    let isDarkTheme = false;

    if (preferences.theme === 'system') {
      isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDarkTheme = preferences.theme === 'night';
    }

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

        alert("Google login successful!");
        await this.router.navigate(['/dashboard']);
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
      this.errorMessage = "Please enter a valid email.";  // Use notification instead of alert
      return;
    }

    this.authService.resetPassword(this.resetEmail)
      .then(() => {
        this.errorMessage = "";
        this.closePopup();
        alert("Password reset link sent to your email.")
      })
      .catch((err) => {
        this.errorMessage = "Failed to send password reset link. Please try again.";
      });
  }
}

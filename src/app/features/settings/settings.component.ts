import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SwitchComponent} from '../../shared/switch/switch.component';
import {AuthService} from '../../core/services/auth.service';
import {PopupComponent} from '../../shared/popup/popup.component';

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule, SwitchComponent, PopupComponent],
  templateUrl: "settings.component.html",
  styleUrls: ["settings.component.css"],
})
export class SettingsComponent implements OnInit {
  protected initialTheme = localStorage.getItem('isdarktheme') === 'true';
  protected userName: string | null = null;
  protected userEmail: string | null = null;
  protected userPfp: string | null = 'incognito.svg';
  isPopupOpen = false;
  private authService = inject(AuthService);

  selectedFile: File | null = null;
  uploadMessage: string | null = null;

  async ngOnInit() {
    this.userName = localStorage.getItem('name');
    this.userEmail = localStorage.getItem('email');
    await this.authService.waitForAuthState(); // Wait for auth state
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.fetchUserImage();
    });
  }

  fetchUserImage() {
    this.authService.fetchUserImage()
      .then((url: string) => {
        this.userPfp = url;
        localStorage.setItem('userPfp', url);
      })
      .catch((err: any) => {
        console.error('Error fetching profile image:', err);
        this.userPfp = localStorage.getItem('userPfp') || "incognito.svg";
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    this.uploadProfilePicture()
  }

  uploadProfilePicture(): void {
    if (!this.selectedFile) return;

    this.authService.uploadProfilePicture(this.selectedFile)
      .then(() => {
        this.uploadMessage = 'Profile picture uploaded successfully!';
        this.fetchUserImage(); // Refresh the profile picture
      })
      .catch((error: any) => {
        console.error('Error uploading profile picture:', error);
        this.uploadMessage = 'Failed to upload profile picture.';
      });
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  changeTheme(isDarkTheme: boolean) {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem('isdarktheme', String(isDarkTheme));
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log("User logged out successfully");
        window.location.href = '/login';
      })
      .catch(err => console.error("Logout failed", err));
  }


  openPasswordResetPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  sendPasswordReset() {
    if (!this.userEmail) {
      alert("No email associated with the user.");
      return;
    }

    this.authService
      .resetPassword(this.userEmail)
      .then(() => {
        alert("Password reset link sent to your email.");
        this.closePopup();
      })
      .catch((err) => {
        console.error("Failed to send password reset link:", err);
        alert("Failed to send password reset link. Please try again.");
      });
  }

  get currency(): string {
    return localStorage.getItem('currency') || 'USD';
  }

  get language(): string {
    return localStorage.getItem('language') || 'en';
  }

  get notificationsEnabled(): boolean {
    return localStorage.getItem('notifications') === 'true';
  }
}

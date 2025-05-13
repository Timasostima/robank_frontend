import {Component, inject, type OnInit} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SwitchComponent} from '../../shared/switch/switch.component';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule, SwitchComponent],
  templateUrl: "settings.component.html",
  styleUrls: ["settings.component.css"],
})
export class SettingsComponent implements OnInit {
  protected initialTheme = localStorage.getItem('isdarktheme') === 'true';
  protected userName: string | null = null;
  protected userEmail: string | null = null;
  protected userPfp: string | null = null;
  private authService = inject(AuthService);

  ngOnInit() {
    this.userName = localStorage.getItem('name');
    this.userEmail = localStorage.getItem('email');
    this.userPfp = this.getPfp();
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

  private getPfp() {
    if (localStorage.getItem('pfp') == "Unknown") {
      return "incognito.svg";
    }
    return localStorage.getItem('pfp');
  }
}

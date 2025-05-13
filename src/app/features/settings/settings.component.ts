import {Component, type OnInit} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SwitchComponent} from '../../shared/switch/switch.component';

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

  signOut() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('pfp');
    window.location.href = '/login';
  }

  private getPfp() {
    if (localStorage.getItem('pfp') == "Unknown") {
      return "incognito.svg";
    }
    return localStorage.getItem('pfp');
  }
}

import {Component, HostListener, inject, Input, OnInit} from "@angular/core"
import {CommonModule} from "@angular/common"
import {RouterLink, RouterLinkActive} from "@angular/router"
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isMobile = false
  menuOpen = false
  authService = inject(AuthService)
  profileMenuOpen = false

  isLoggedIn: boolean | null = null;

  async ngOnInit() {
    this.isLoggedIn = await this.authService.waitForAuthState(); // Wait for auth state
    this.checkScreenSize();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenSize()
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    // Close profile dropdown when clicking outside
    if (this.profileMenuOpen) {
      const target = event.target as HTMLElement
      const profileButton = document.querySelector(".profile-button")
      const profileDropdown = document.querySelector(".profile-dropdown")

      if (profileButton && profileDropdown) {
        if (!profileButton.contains(target) && !profileDropdown.contains(target)) {
          this.profileMenuOpen = false
        }
      }
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768
    if (!this.isMobile) {
      this.menuOpen = false
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  closeMenu() {
    this.menuOpen = false
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen
  }

  logout() {
    this.authService.logout()
      .then(() => {
        window.location.href = '/login';
      })
      .catch(err => console.error("Logout failed", err));
  }

  toLandingPage() {
    window.location.href = '/';
  }
}

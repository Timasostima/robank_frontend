import { Component, Input, Output, EventEmitter, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-popup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: `popup.component.html`,
  styleUrls: ["popup.component.css"],
})
export class PopupComponent {
  @Input() isOpen = false
  @Input() title = "Popup"
  @Input() showFooter = true
  @Input() confirmText = "Confirm"
  @Input() cancelText = "Cancel"
  @Input() titleId = "popup-title"

  @Output() closed = new EventEmitter<void>()
  @Output() confirmed = new EventEmitter<void>()

  // Close popup when ESC key is pressed
  @HostListener("document:keydown.escape")
  onEscapeKey() {
    if (this.isOpen) {
      this.close()
    }
  }

  // Prevent clicks on the popup container from closing the popup
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains("popup-overlay")) {
      this.close()
    }
  }

  close() {
    this.closed.emit()
  }

  confirm() {
    this.confirmed.emit()
  }
}

import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: "notification.component.html",
  styleUrls: ['./notification.component.css'],
  imports: [NgClass, NgIf],
})
export class NotificationComponent implements OnChanges, OnDestroy {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' = 'error';

  isFadingOut = false;
  private timeoutId: any;
  private readonly DISPLAY_DURATION = 2500; // 2.5 seconds
  private readonly FADE_OUT_DURATION = 500; // 0.5 seconds

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && changes['message'].currentValue) {
      this.resetNotification();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private resetNotification(): void {
    clearTimeout(this.timeoutId);
    this.isFadingOut = false;
    this.startAutoDismiss();
  }

  private startAutoDismiss(): void {
    this.timeoutId = setTimeout(() => this.startFadeOut(), this.DISPLAY_DURATION);
  }

  private startFadeOut(): void {
    this.isFadingOut = true;
    this.timeoutId = setTimeout(() => this.clearMessage(), this.FADE_OUT_DURATION);
  }

  clearMessage(): void {
    this.message = '';
    this.isFadingOut = false;
    clearTimeout(this.timeoutId);
  }
}

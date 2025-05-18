import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.css']
})
export class ArrowButtonComponent {
  @Input() direction: 'left' | 'right' = 'left';
  @Output() click = new EventEmitter<void>();

  onClick(): void {
    this.click.emit();
  }
}
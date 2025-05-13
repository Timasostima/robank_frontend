import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {
  @Output()
  toggle = new EventEmitter<boolean>();

  @Input()
  checked = false;

  onToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.toggle.emit(this.checked);
  }
}

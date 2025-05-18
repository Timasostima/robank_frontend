import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Goal, GoalService} from '../../core/services/goal.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals: Goal[] = [];
  error: string | null = null;
  authService = inject(AuthService);

  constructor(private goalService: GoalService) {
  }

  async ngOnInit() {
    await this.authService.waitForAuthState();
    this.loadGoals();
  }

  loadGoals(): void {
    this.error = null;

    this.goalService.getGoals().subscribe({
      next: (goals) => {
        this.goals = goals;
      },
      error: (error) => {
        this.error = 'Failed to load goals. Please try again.';
        console.error('Error loading goals:', error);
      }
    });
  }

  getGoalImage(index: number): string {
    const imageCount = 4;
    return `goal/img_${(index % imageCount) + 1}.png`;
  }

  get currencySymbol(): string {
    return localStorage.getItem('currencySymbol') || '€';
  }
}

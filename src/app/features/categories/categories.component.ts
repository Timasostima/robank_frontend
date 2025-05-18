import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryService} from '../../core/services/category.service';
import {BillsService} from '../../core/services/bills.service';
import {forkJoin} from 'rxjs';
import Chart from 'chart.js/auto';
import {AuthService} from '../../core/services/auth.service';

interface CategoryViewModel {
  id: number;
  name: string;
  description: string;
  color: string;
  amount: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('categoryChart') chartCanvas!: ElementRef;

  categories: CategoryViewModel[] = [];
  loading = true;
  error: string | null = null;
  totalAmount = 0;
  chart: Chart | null = null;
  authService = inject(AuthService)

  constructor(
    private categoryService: CategoryService,
    private billsService: BillsService
  ) {
  }

  async ngOnInit() {
    await this.authService.waitForAuthState();
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      categories: this.categoryService.getCategories(),
      bills: this.billsService.getBills()
    }).subscribe({
      next: (results) => {
        this.processData(results.categories, results.bills);
        this.loading = false;

        setTimeout(() => this.initChart(), 10);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to load data. Please try again.';
        console.error('Error loading categories data:', error);
      }
    });
  }

  processData(categories: any[], bills: any[]): void {
    const categoryAmounts = new Map<number, number>();

    categories.forEach(category => {
      categoryAmounts.set(category.id, 0);
    });

    bills.forEach(bill => {
      if (bill.categoryId && categoryAmounts.has(bill.categoryId)) {
        categoryAmounts.set(
          bill.categoryId,
          categoryAmounts.get(bill.categoryId) + bill.amount
        );
      }
    });

    this.categories = categories.map(category => {
      const amount = categoryAmounts.get(category.id) || 0;

      const color = category.color || this.getRandomColor();

      return {
        id: category.id,
        name: category.name,
        description: category.description || '',
        color: color,
        amount: amount
      };
    });

    this.categories.sort((a, b) => b.amount - a.amount);
    this.totalAmount = this.categories.reduce((sum, cat) => sum + cat.amount, 0);
  }

  initChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart instance
    }

    // Ensure the canvas element exists and categories are loaded
    if (!this.chartCanvas?.nativeElement || this.categories.length === 0) {
      return;
    }

    // Initialize the chart
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(cat => cat.name),
        datasets: [{
          data: this.categories.map(cat => cat.amount),
          backgroundColor: this.categories.map(cat => cat.color),
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.formattedValue;
                const percentage = Math.round(context.parsed / context.dataset.data.reduce((a, b) => a + b, 0) * 100);
                return `${label}: ${value}₽ (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

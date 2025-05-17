import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillsService, Bill} from '../../core/services/bills.service';
import {CategoryService, Category} from '../../core/services/category.service';
import {forkJoin} from 'rxjs';
import {addDays, format, startOfWeek} from 'date-fns';
import {Chart, ChartConfiguration, ChartData} from 'chart.js/auto';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  categories: Category[] = [];
  error: string | null = null;
  weekOffset = 0;
  currentWeekDates: Date[] = [];
  currentWeekFormatted: string = '';
  currentMonth: string = '';
  currentYear: number = 0;
  authService = inject(AuthService);

  private chart: Chart | null = null;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Daily Spending',
        backgroundColor: '#6750A4',
        borderColor: '#6750A4',
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false, // Disable dynamic resizing
    maintainAspectRatio: false, // Allow custom width/height
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  constructor(
    private billsService: BillsService,
    private categoryService: CategoryService
  ) {
  }

  async ngOnInit() {
    await this.authService.waitForAuthState();
    this.loadData();
    this.setCurrentDate();
    if (this.bills.length > 0) {
      this.initChart();
    }
  }

  setCurrentDate(): void {
    const now = new Date();
    this.currentMonth = format(now, 'MMMM');
    this.currentYear = now.getFullYear();
  }

  loadData(): void {
    forkJoin({
      bills: this.billsService.getBills(),
      categories: this.categoryService.getCategories()
    }).subscribe({
      next: (data) => {
        this.bills = data.bills;
        this.categories = data.categories;
        this.generateWeekData();

        // Initialize chart after data is loaded
        setTimeout(() => {
          this.initChart();
        }, 0);
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.error = 'Failed to load bills. Please try again later.';
      }
    });
  }

  initChart(): void {
    const canvas = document.getElementById('billsChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(canvas, {
        type: 'bar',
        data: this.barChartData,
        options: this.barChartOptions
      });
    }
  }

  generateWeekData(): void {
    const today = new Date();
    let startOfCurrentWeek = startOfWeek(today, {weekStartsOn: 1});

    startOfCurrentWeek = addDays(startOfCurrentWeek, this.weekOffset * 7);

    this.currentWeekDates = Array.from({length: 7}, (_, i) =>
      addDays(startOfCurrentWeek, i)
    );

    const firstDay = format(this.currentWeekDates[0], 'd');
    const lastDay = format(this.currentWeekDates[6], 'd');
    const month = format(this.currentWeekDates[0], 'MMMM');
    this.currentWeekFormatted = `${firstDay} - ${lastDay} ${month}`;

    this.updateChartData();
  }

  updateChartData(): void {
    const labels = this.currentWeekDates.map(date => format(date, 'd'));

    const dailyTotals = this.currentWeekDates.map(date => {
      const dateString = format(date, 'dd-MM-yyyy');
      return this.bills
        .filter(bill => bill.date === dateString)
        .reduce((total, bill) => total + bill.amount, 0);
    });

    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = dailyTotals;

    if (this.chart) {
      this.chart.update();
    }
  }

  previousWeek(): void {
    this.weekOffset -= 1;
    this.generateWeekData();
  }

  nextWeek(): void {
    this.weekOffset += 1;
    this.generateWeekData();
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getCategoryColor(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.color : '#808080';
  }

  get currentWeekBills(): Bill[] {
    const weekDatesFormatted = this.currentWeekDates.map(date =>
      format(date, 'dd-MM-yyyy')
    );

    return this.bills.filter(bill =>
      weekDatesFormatted.includes(bill.date)
    );
  }
}

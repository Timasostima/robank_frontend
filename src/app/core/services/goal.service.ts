import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Goal {
  id: number;
  name: string;
  price: number;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = `${environment.apiUrl}/goals`;

  constructor(private http: HttpClient) {}

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl);
  }
}

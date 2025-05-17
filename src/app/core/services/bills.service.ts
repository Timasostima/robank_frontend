import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Bill {
  id: number;
  name: string;
  amount: number;
  categoryId: number;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private apiUrl = `${environment.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }
}

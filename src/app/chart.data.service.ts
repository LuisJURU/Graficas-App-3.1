import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ChartData {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private dataSubject = new BehaviorSubject<ChartData>({
    labels: ['A', 'B', 'C', 'D'],
    data: [65, 59, 80, 81]
  });
  data$ = this.dataSubject.asObservable();

  updateData(newData: ChartData) {
    this.dataSubject.next(newData);
  }
}

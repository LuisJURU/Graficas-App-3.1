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
    labels: ['A','B','C'],
    data: [20, 30, -10]
  });
  data$ = this.dataSubject.asObservable();

  updateData(newData: ChartData) {
    if (!newData.labels || newData.labels.length !== newData.data.length) {
      newData.labels = this.generarLabelsPredeterminados(newData.data.length);
    }
    this.dataSubject.next(newData);
  }

  private generarLabelsPredeterminados(length: number): string[] {
    const labels = [];
    for (let i = 0; i < length; i++) {
      labels.push(this.generarLabel(i));
    }
    return labels;
  }

  private generarLabel(index: number): string {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode(65 + (index % 26)) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  }
}

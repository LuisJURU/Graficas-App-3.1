import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartDataService } from '../chart.data.service';
import { Subscription } from 'rxjs';
import { DataModifierComponent } from "../datos/data-modifier.component";

@Component({
    selector: 'app-barras',
    standalone: true,
    templateUrl: './barras.component.html',
    styleUrls: ['./barras.component.css'],
    imports: [DataModifierComponent]
})
export class BarrasComponent implements AfterViewInit, OnDestroy {
  public chart: Chart | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(private chartDataService: ChartDataService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSubscription = this.chartDataService.data$.subscribe(chartData => {
      if (this.chart) {
        this.chart.data.labels = chartData.labels;
        this.chart.data.datasets[0].data = chartData.data;
        this.chart.update();
      } else {
        this.initializeChart(chartData.labels, chartData.data);
      }
      this.cdr.detectChanges();  // Forzar detección de cambios aquí
    });
  }

  initializeChart(labels: string[], data: number[]) {
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: data,
        fill: false,
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)',],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)',],
        tension: 0.1

      }]
    };

    this.chart = new Chart('chart', {
      type: 'bar',
      data: chartData,
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}

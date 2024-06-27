import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataService } from '../chart.data.service';

@Component({
  selector: 'app-data-modifier',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-modifier.component.html',
  styleUrls: ['./data-modifier.component.css']
})
export class DataModifierComponent {
  newLabels: string = '';
  newData: string = '';

  constructor(private chartDataService: ChartDataService) {}

  updateData() {
    const labels = this.newLabels.split(',').map(label => label.trim());
    const data = this.newData.split(',').map(num => parseInt(num.trim(), 10));
    this.chartDataService.updateData({ labels, data });
  }
}

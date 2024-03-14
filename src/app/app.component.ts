import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import {
  DashboardService,
  FullDataResponse,
  LayoutResponse,
} from './dashboard.service'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Note: it's `styleUrls`, not `styleUrl`
})
export class AppComponent implements OnInit {
  title = '';
  layoutResponse?: LayoutResponse = undefined; // Initialize with a default value
  dataResponse?: FullDataResponse = undefined; // Initialize with a default value
  format = '1.0-0';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    Promise.all([
      this.dashboardService.fetchNewLayoutResponse(),
      this.dashboardService.fetchBackendDataResponse(),
    ]).then(([layoutResponse, dataResponse]) => {
      console.group(
        `%capp.component.ts`,
        'color: yellow; font-size: 13px; font-weight: bold;'
      );
      console.log('\n', `layoutResponse = `, layoutResponse, '\n');
      console.log('\n', `dataResponse = `, dataResponse, '\n');
      console.groupEnd();

      this.layoutResponse = layoutResponse;
      this.dataResponse = dataResponse;

      this.title = layoutResponse.displayName;
    });
  }

  isDataSet(elementType: string): boolean {
    return elementType === 'DATA_SET';
  }

  getFieldLabel(elementName: string): string {
    return (
      this.layoutResponse?.fieldDefinitions?.[elementName]?.label || 'Unknown'
    );
  }

  getFieldValue(elementName: string): string | number {
    const value = this.dataResponse?.dataPoints?.[elementName] || 'Unknown';

    return value;
  }

  getElementDigitsInfo(elementName: string): string {
    const formatPayload =
      this.layoutResponse?.fieldDefinitions?.[elementName]?.digitsInfo || '';

    return formatPayload;
  }

  getDatasetTableRowsByName(setName: string) {
    const dataSet = this.dataResponse?.dataSets?.find(
      (ds) => ds.name === setName
    );

    const datasetData = dataSet?.data || [];

    console.log('\n', `datasetData = `, datasetData, '\n');

    return datasetData;
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}

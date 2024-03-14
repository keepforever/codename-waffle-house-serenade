import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import {
  DashboardService,
  FullDataResponse,
  LayoutResponse,
  Format,
  FormatEnum,
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
    const labelConfig = this.layoutResponse?.fieldDefinitions?.[elementName];

    switch (labelConfig?.format) {
      case FormatEnum.Percent: {
        if (typeof this?.dataResponse?.dataPoints?.[elementName] === 'number') {
          return (+this?.dataResponse?.dataPoints?.[elementName] || 0) * 100;
        } else {
          return 0;
        }
      }

      default:
        return this.dataResponse?.dataPoints?.[elementName] || 'Error';
    }
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
    return datasetData;
  }

  getDatasetColumnTotal(setName: string, fieldName: string) {
    const dataSet = this.dataResponse?.dataSets?.find(
      (ds) => ds.name === setName
    );
    const labelConfig = this.layoutResponse?.fieldDefinitions?.[fieldName];
    const aggFn = labelConfig?.aggFn;

    const datasetData = dataSet?.data || [];
    let payload = 0;

    console.group(
      `%capp.component.ts`,
      'color: aqua; font-size: 13px; font-weight: bold;'
    );
    console.log('\n', `labelConfig = `, labelConfig, '\n');
    console.log('\n', `dataSet = `, dataSet, '\n');
    console.log('\n', `datasetData = `, datasetData, '\n');
    console.log('\n', `payload = `, payload, '\n');
    console.log('\n', `setName = `, setName, '\n');
    console.log('\n', `fieldName = `, fieldName, '\n');
    console.groupEnd();

    switch (aggFn) {
      case 'sum':
        return datasetData.reduce(
          (acc, row) => acc + Number(row[fieldName]),
          0
        );
      case 'average':
        const sum = datasetData.reduce(
          (acc, row) => acc + Number(row[fieldName]),
          0
        );
        return datasetData.length > 0 ? sum / datasetData.length : 0;
      default:
        return ''; // It might be more consistent to return a numeric default for aggregation functions
    }
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  getFieldValuePrefix(elementName: string): string {
    const labelConfig = this.layoutResponse?.fieldDefinitions?.[elementName];

    switch (labelConfig?.format) {
      case FormatEnum.DateTime:
        return '';
      case FormatEnum.Currency:
        return '$';
      case FormatEnum.Percent:
        return '';
      case FormatEnum.Number:
        return '';
      case FormatEnum.None:
        return '';
      default:
        return '';
    }
  }

  getFieldValueSuffix(elementName: string): string {
    const labelConfig = this.layoutResponse?.fieldDefinitions?.[elementName];

    switch (labelConfig?.format) {
      case FormatEnum.DateTime:
        return '';
      case FormatEnum.Currency:
        return '';
      case FormatEnum.Percent:
        return '%';
      case FormatEnum.Number:
        return '';
      case FormatEnum.None:
        return '';
      default:
        return '';
    }
  }
}

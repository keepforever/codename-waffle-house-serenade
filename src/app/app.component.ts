import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DashboardService } from './dashboard.service'; // Adjust the path as necessary
import { LayoutResponse, FullDataResponse, FormatEnum } from './interfaces';
import { logObjectDetails } from './utils/logObjectDetails';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '';
  layoutResponse?: LayoutResponse = undefined;
  dataResponse?: FullDataResponse = undefined;

  constructor(private dashboardService: DashboardService) {}

  /** Initializes component and fetches layout and data responses. */
  ngOnInit() {
    Promise.all([
      this.dashboardService.fetchNewLayoutResponse(),
      this.dashboardService.fetchBackendDataResponse(),
    ]).then(([layoutResponse, dataResponse]) => {
      logObjectDetails(
        {
          layoutResponse,
          dataResponse,
        },
        'app.component.ts, ngOnInit',
        'yellow'
      );

      this.layoutResponse = layoutResponse;
      this.dataResponse = dataResponse;

      this.title = layoutResponse.displayName;
    });
  }

  /** Checks if the element type is a data set. */
  isDataSet(elementType: string): boolean {
    return elementType === 'DATA_SET';
  }

  /** Fetches the label for a given field from the layout response. */
  getFieldLabel(elementName: string): string {
    return (
      this.layoutResponse?.fieldDefinitions?.[elementName]?.label || 'Unknown'
    );
  }

  /** Retrieves the value for a given field, applying formatting if necessary. */
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

  /** Returns the digit information for a given element. */
  getElementDigitsInfo(elementName: string): string {
    const formatPayload =
      this.layoutResponse?.fieldDefinitions?.[elementName]?.digitsInfo || '';
    return formatPayload;
  }

  /** Retrieves all rows for a given dataset name. */
  getDatasetTableRowsByName(setName: string) {
    const dataSet = this.dataResponse?.dataSets?.find(
      (ds) => ds.name === setName
    );
    const datasetData = dataSet?.data || [];
    return datasetData;
  }

  /** Calculates total for a column in a dataset by aggregation function defined. */
  getDatasetColumnTotal(setName: string, fieldName: string) {
    const dataSet = this.dataResponse?.dataSets?.find(
      (ds) => ds.name === setName
    );
    const labelConfig = this.layoutResponse?.fieldDefinitions?.[fieldName];
    const aggFn = labelConfig?.aggFn;

    const datasetData = dataSet?.data || [];

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
        return '';
    }
  }

  /** Checks if a value is of type number. */
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  /** Determines the prefix for a field value based on its format. */
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

  /** Returns the suffix for a given field value based on its format. */
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

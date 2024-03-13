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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    Promise.all([
      this.dashboardService.fetchNewLayoutResponse(),
      this.dashboardService.fetchBackendDataResponse(),
    ]).then(([layoutResponse, dataResponse]) => {
      // At this point, you have both responses available and can manipulate/join them as needed.
      // This is a placeholder for your manipulation and joining logic.
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
}

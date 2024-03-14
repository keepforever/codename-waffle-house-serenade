import { Injectable } from '@angular/core';
import { backendDataResponse, newLayoutResponse } from './mockData';
import { FullDataResponse, LayoutResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  fetchNewLayoutResponse(): Promise<LayoutResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newLayoutResponse);
      }, 750);
    });
  }

  fetchBackendDataResponse(): Promise<FullDataResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(backendDataResponse);
      }, 750);
    });
  }
}

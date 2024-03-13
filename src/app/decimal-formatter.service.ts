import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DecimalFormatterService {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any, format: string): string | null {
    return this.decimalPipe.transform(value, format);
  }
}

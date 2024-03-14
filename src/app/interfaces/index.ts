export interface DataResponse {
  [index: string]: string | number;
}

export interface DatasetResponse {
  name: string;
  data: DataResponse[];
}

export interface FullDataResponse {
  dataPoints: DataResponse;
  dataSets: DatasetResponse[];
}

export interface ElementPosition {
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
}

export interface ElementGroup {
  name: string;
  label: string;
  type: ElementType;
  position?: ElementPosition;
  elements: Element[];
  width: number;
}

type ElementType = 'DATA_POINT' | 'DATA_SET';

export interface Element {
  name: string;
  type: ElementType;
  displayName?: string;
  width: number;
  fields?: DatasetFields[];
}

export interface DatasetFields {
  name: string;
}

export interface FieldDefinitions {
  [index: string]: FieldDefinition;
}

export type Format = 'datetime' | 'currency' | 'percent' | 'number' | 'none';
export enum FormatEnum {
  DateTime = 'datetime',
  Currency = 'currency',
  Percent = 'percent',
  Number = 'number',
  None = 'none',
}
export type Type = 'string' | 'double' | 'datetime';

export interface FieldDefinition {
  label: string;
  format: Format;
  type: Type;
  digitsInfo?: string;
  aggFn: 'none' | 'sum' | 'average';
}

export interface LayoutResponse {
  displayName: string;
  fieldDefinitions: FieldDefinitions;
  layout: ElementGroup[];
}

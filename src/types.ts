export interface ColumnData {
  values: number[];
  mean: number | null;
  variance: number | null;
  standardDeviation: number | null;
  median: number | null;
  mode: number | null;
}

export interface DataStats {
  [key: string]: ColumnData;
}
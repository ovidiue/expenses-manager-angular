import { ChartDataset } from "@models/interfaces/chart-dataset";

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

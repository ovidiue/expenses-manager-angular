import { ChartDataset } from '@models/interfaces/chart-dataset.interface';

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

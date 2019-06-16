export interface ServerResp<T> {
  content: T[];
  totalElements: number;
  length: number;
};

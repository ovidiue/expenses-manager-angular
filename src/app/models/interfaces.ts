export interface ServerResp<T> {
  content: T[];
  totalElements: number;
  length: number;
}

export enum RoutePaths {
  TAG_LISTING = 'tags',
  CATEGORY_LISTING = 'categories'
}

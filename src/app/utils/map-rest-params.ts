import { HttpParams } from '@angular/common/http';

const getSort = (param: number): string => {
  return param > 0 ? 'asc' : 'desc';
};

export default (param: any): HttpParams => {
  let params: HttpParams = new HttpParams();
  if (param) {
    if (param.rows) {
      params = params.append('size', param.rows.toString());
    }
    if (param.first) {
      params = params.append('page', (param.first / 10).toString());
    }
    if (param.sortField && param.sortOrder) {
      params = params.append(
        'sort',
        param.sortField + ',' + getSort(param.sortOrder)
      );
    }
  }

  return params;
};

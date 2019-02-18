import {LazyLoadEvent} from 'primeng/api';
import {HttpParams} from '@angular/common/http';
export default (param: LazyLoadEvent): HttpParams => {
  let params: HttpParams = new HttpParams();
  if (param.rows) {
    params = params.append('size', param.rows.toString());
  }
  if (param.first) {
    params = params.append('page', (param.first / 10).toString());
  }
  return params;
}

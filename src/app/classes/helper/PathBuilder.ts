import {BASE_PATH} from '../../utils/constants/base-path';
import {ApiPath} from '../../utils/constants/api-paths';

export class PathBuilder {
  private static ROOT = BASE_PATH;

  private constructor(cat: ApiPath) {
  }

  static get(path: ApiPath) {
    return PathBuilder.ROOT + '/' + path;
  }

}

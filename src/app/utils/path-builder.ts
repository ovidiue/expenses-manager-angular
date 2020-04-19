import { ApiPath } from "./constants/api-paths";
import { BASE_PATH } from "./constants/base-path";

export class PathBuilder {
  private static ROOT = BASE_PATH;

  private constructor(cat: ApiPath) {
  }

  static get(path: ApiPath) {
    return PathBuilder.ROOT + "/" + path;
  }
}

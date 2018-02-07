import { toPath } from 'lodash';

/**
 * @private Deeply get a value from an object via it's path.
 */
export function dlv(
    obj: any,
    key: string | string[],
    def?: any,
    p: number = 0
  ) {
    const path = toPath(key);
    while (obj && p < path.length) {
      obj = obj[path[p++]];
    }
    return obj === undefined ? def : obj;
  }
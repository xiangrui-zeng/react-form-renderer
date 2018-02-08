import { toPath } from 'lodash';

/**
 * @private Deeply get a value from an object via it's path.
 */
export function dlv(obj: object, key: string | string[], p: number = 0): object {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj;
}

import {isInteger, isPlainObject, mergeWith} from 'lodash';


export function isNaturalNumber(value: number): boolean {
  return isInteger(value) && value >= 0 && !Object.is(value, -0);
}

export function isNodeJs(): boolean {
  return typeof process !== 'undefined' &&
    typeof process.release !== 'undefined' &&
    process.release.name === 'node';
}

export function deepAssign<T extends object>(target: T, ...sources: object[]): T {
  return mergeWith(target, ...sources, (targetValue: unknown, sourceValue: unknown) => {
    if (typeof targetValue === 'undefined') {
      return sourceValue;
    }

    if ((isPlainObject(targetValue) && isPlainObject(sourceValue)) ||
      (Array.isArray(targetValue) && Array.isArray(sourceValue))) {
      return undefined;
    }

    return sourceValue;
  });
}

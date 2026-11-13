import {deepAssign, isNaturalNumber, isNodeJs} from './utils';


describe('@isNaturalNumber', () => {
  it.each([0, 1, 42])('should accept non-negative integers: %s', (value) => {
    expect(isNaturalNumber(value)).toBe(true);
  });

  it.each([-0, -1, 1.5, NaN, Infinity, -Infinity])('should reject invalid natural numbers: %s', (value) => {
    expect(isNaturalNumber(value)).toBe(false);
  });
});

describe('@isNodeJs', () => {
  it('should identify the Node.js runtime', () => {
    expect(isNodeJs()).toBe(true);
  });
});

describe('@deepAssign', () => {
  it('should recursively merge plain objects and merge arrays by index', () => {
    const target = {
      nested: {first: true, retained: true},
      values: [1, 2]
    };

    const result = deepAssign(target, {
      nested: {second: true},
      values: [3]
    });

    expect(result).toBe(target);
    expect(result).toEqual({
      nested: {first: true, retained: true, second: true},
      values: [3, 2]
    });
  });

  it('should preserve source object references when no merge target exists', () => {
    const data = {username: 'login', password: 'password'};
    const target: {data?: typeof data} = {};

    deepAssign(target, {data});

    expect(target.data).toBe(data);
  });

  it('should replace null and non-plain objects rather than merging them', () => {
    const originalDate = new Date('2025-01-01T00:00:00.000Z');
    const replacementDate = new Date('2025-02-01T00:00:00.000Z');
    const target = {
      body: <{enabled: boolean} | null>{enabled: true},
      date: <Date | Record<string, never>>originalDate
    };

    deepAssign(target, {
      body: null,
      date: replacementDate
    });

    expect(target.body).toBeNull();
    expect(target.date).toBe(replacementDate);
  });

  it('should replace values when their mergeable types do not match', () => {
    const target = {
      objectToArray: {retained: true},
      arrayToObject: [1, 2]
    };
    const replacementArray = [3];
    const replacementObject = {added: true};

    deepAssign(target, {
      objectToArray: replacementArray,
      arrayToObject: replacementObject
    });

    expect(target.objectToArray).toBe(replacementArray);
    expect(target.arrayToObject).toBe(replacementObject);
  });

  it('should ignore undefined properties', () => {
    const target = {retained: true, replaced: 'old'};

    deepAssign(target, {
      retained: undefined,
      replaced: 'new'
    });

    expect(target).toEqual({retained: true, replaced: 'new'});
  });
});

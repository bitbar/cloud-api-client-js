import 'finka';

declare global {

  namespace globalThis  {
    const isNodeJs: boolean;
  }

  interface ObjectConstructor {
    deepAssign (target: object, s1: object, s2?: object, s3?: object, s4?: object, s5?: object): object;
  }

  interface NumberConstructor {
    isNatural (n: number): boolean;
  }

  interface ArrayConstructor {
    wrap (arr: Array<any> | any): Array<any>;
  }
}

export {};

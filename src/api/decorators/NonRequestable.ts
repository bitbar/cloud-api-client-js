import {AxiosResponse} from "axios";

export function NonRequestable<T extends { new (...args: any[]): object }>(constructor: T) {
  return class extends constructor {
    send(): Promise<AxiosResponse> {
      return Promise.reject();
    }
  };
}

import { AxiosResponse } from 'axios';
export declare function NonRequestable<T extends {
    new (...args: any[]): object;
}>(constructor: T): {
    new (...args: any[]): {
        send(): Promise<AxiosResponse>;
    };
} & T;

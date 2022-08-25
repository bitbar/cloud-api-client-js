import { AxiosBasicCredentials } from 'axios';
export declare type ApiConfig = {
    baseURL: string;
    cloudUrl: string;
    v2?: boolean;
    apiKey?: string;
    auth?: AxiosBasicCredentials;
    withCredentials?: boolean;
};
export default ApiConfig;

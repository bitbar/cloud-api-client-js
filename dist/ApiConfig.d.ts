import { AxiosBasicCredentials } from 'axios';
export type ApiConfig = {
    baseURL: string;
    cloudUrl: string;
    v2?: boolean;
    apiKey?: string;
    auth?: AxiosBasicCredentials;
    withCredentials?: boolean;
    withXSRFToken?: boolean | undefined;
};
export default ApiConfig;

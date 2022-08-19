import { OsType } from './Enum';
export declare type Browser = {
    architecture: string;
    displayName: string;
    id: number;
    install: boolean;
    installUrl: string;
    name: string;
    osType: OsType;
    version: string;
};
export declare type BrowserData = Omit<Browser, 'id' | 'install'>;
export declare type DeviceBrowserData = {
    browserIds: Array<number>;
};

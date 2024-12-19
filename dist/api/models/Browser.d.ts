import { OsType } from './Enum';
export type Browser = {
    architecture: string;
    displayName: string;
    id: number;
    install: boolean;
    installUrl: string;
    name: string;
    osType: OsType;
    version: string;
};
export type BrowserData = Omit<Browser, 'id' | 'install'>;
export type DeviceBrowserData = {
    browserIds: Array<number>;
};

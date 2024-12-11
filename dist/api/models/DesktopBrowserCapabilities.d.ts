import { Platform } from './Device';
export declare type DesktopBrowserCapabilities = {
    id: number;
    platforms: Array<any>;
};
export declare type DesktopPlatform = {
    browsers: Array<DesktopBrowser>;
    id: number;
    name: string;
    resolutions: Array<string>;
    value: Platform;
    version: string;
};
export declare type DesktopBrowser = {
    displayName: string;
    id: number;
    name: string;
    value: string;
    version: Array<string>;
};

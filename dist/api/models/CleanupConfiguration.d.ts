import { DeviceCleanupConfiguration } from './Device';
export declare type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled' | 'osType'>;
export interface SpecificCleanupConfigurationQueryParams {
    serialId: string;
}

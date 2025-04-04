import { DeviceCleanupConfiguration } from './Device';
export type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled' | 'osType' | 'description'>;
export interface SpecificCleanupConfigurationQueryParams {
    serialId: string;
}

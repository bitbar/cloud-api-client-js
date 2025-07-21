import { DeviceCleanupConfiguration } from './Device';
export type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'name' | 'enabled' | 'osType' | 'description'>;
export interface SpecificCleanupConfigurationQueryParams {
    serialId: string;
}

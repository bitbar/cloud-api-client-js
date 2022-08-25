import {DeviceCleanupConfiguration} from './Device';


export type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled' | 'osType'>;

export interface SpecificCleanupConfigurationQueryParams {
  serialId: string;
}

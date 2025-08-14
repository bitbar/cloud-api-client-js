export type AccountPreferences = {
  allowedFileExtensions: Array<string>;
  id: number;
  dedicatedDevicesTestTimeout: number;
  defaultTestTimeout: number;
  testTimeout: number
}

export type AccountPreferencesData = Partial<Omit<AccountPreferences, 'id'>>

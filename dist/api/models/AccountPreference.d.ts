export declare type AccountPreferences = {
    allowedFileExtensions: Array<string>;
    id: number;
    defaultTestTimeout: number;
    testTimeout: number;
};
export declare type AccountPreferencesData = Partial<Omit<AccountPreferences, 'id'>>;

export declare type SimpleSetting = Record<string, string | number | boolean>;
export declare type NestedSetting = Record<string, SimpleSetting>;
export declare type Settings = SimpleSetting | NestedSetting | Record<string, NestedSetting>;
export declare type SettingsParams = {
    withVulnerableData: boolean;
};

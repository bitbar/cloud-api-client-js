export type SimpleSetting = Record<string, string | number | boolean>;
export type NestedSetting = Record<string, SimpleSetting>;
export type Settings = SimpleSetting | NestedSetting | Record<string, NestedSetting>;
export type SettingsParams = {withVulnerableData: boolean;};

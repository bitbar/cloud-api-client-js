import { QueryParams } from './HTTP';
export declare type UserPreference = {
    defaultHttpSessionMaxInactiveInterval: number;
    httpSessionMaxInactiveInterval: number | null;
    id: number;
};
export declare type UserPreferenceData = {
    httpSessionMaxInactiveInterval: number | null;
};
export interface UiPreferencesData extends QueryParams {
    data: string;
}

import { QueryParams } from './HTTP';
export type UserPreference = {
    defaultHttpSessionMaxInactiveInterval: number;
    httpSessionMaxInactiveInterval: number | null;
    id: number;
};
export type UserPreferenceData = {
    httpSessionMaxInactiveInterval: number | null;
};
export interface UiPreferencesData extends QueryParams {
    data: string;
}

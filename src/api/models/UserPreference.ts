import {QueryParams} from './HTTP';

export type UserPreference = {
  defaultHttpSessionMaxInactiveInterval: number;
  defaultTestTimeout: number;
  httpSessionMaxInactiveInterval: number;
  id: number;
  testTimeout: number;
}

export interface UiPreferencesData extends QueryParams {
  data: string;
}

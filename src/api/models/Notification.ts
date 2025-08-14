import {QueryParams} from './HTTP';


export enum NotificationChannel {
  SLACK = 'SLACK',
  EMAIL = 'EMAIL',
  WEBHOOK = 'WEBHOOK'
}

export enum NotificationScope {
  ALL = 'ALL',
  TEST_RUN = 'TEST_RUN',
  TEST_RUN_FAILURE = 'TEST_RUN_FAILURE',
  TEST_RUN_SUCCEEDED = 'TEST_RUN_SUCCEEDED',
  SYSTEM = 'SYSTEM',
  CHECK = 'CHECK',
}

export type Notification = {
  channel: NotificationChannel;
  destination: string;
  id: number;
  projectId?: number;
  projectName?: string;
  scope: NotificationScope;
  userEmail: string;
  userId: number;
}

export interface NotificationData extends QueryParams {
  scope: NotificationScope;
}

export type NotificationsData = Pick<Notification, 'channel' | 'destination' | 'projectId' | 'scope'>;

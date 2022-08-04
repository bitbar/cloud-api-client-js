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
  MAINTENANCE = 'MAINTENANCE',
  MAINTENANCE_RELEASE = 'MAINTENANCE_RELEASE',
  CUSTOM = 'CUSTOM',
  NEWS = 'NEWS',
  SYSTEM = 'SYSTEM',
  CHECK = 'CHECK',
  PLAN_LIMIT_REACHED = 'PLAN_LIMIT_REACHED',
  PLAN_INVOICE = 'PLAN_INVOICE'
}

export type Notification = {
  channel: NotificationChannel;
  destination: string;
  id: number;
  projectId: number
  projectName: string;
  scope: NotificationScope;
  userEmail: string;
  userId: number;
}

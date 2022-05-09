export type NotificationChannel = 'SLACK' | 'EMAIL' | 'WEBHOOK';
export type NotificationScope = 'ALL' | 'TEST_RUN' | 'TEST_RUN_FAILURE' | 'TEST_RUN_SUCCEEDED' | 'MAINTENANCE'
  | 'MAINTENANCE_RELEASE' | 'CUSTOM' | 'NEWS' | 'SYSTEM' | 'CHECK' | 'PLAN_LIMIT_REACHED' | 'PLAN_INVOICE';

export type Notification = {
  channel: NotificationChannel;
  destination: string;
  id: number;
  projectId: number
  projectName: string;
  scope: NotificationScope;
  selfURI: string;
  userEmail: string;
  userId: number;
}

export type Notification = {
  channel: 'SLACK' | 'EMAIL' | 'WEBHOOK';
  destination: string;
  id: number;
  projectId: number
  projectName: string;
  scope: 'ALL' | 'TEST_RUN' | 'TEST_RUN_FAILURE' | 'TEST_RUN_SUCCEEDED' | 'MAINTENANCE' | 'MAINTENANCE_RELEASE' | 'CUSTOM' | 'NEWS' | 'SYSTEM' | 'CHECK' | 'PLAN_LIMIT_REACHED' | 'PLAN_INVOICE';
  selfURI: string;
  userEmail: string;
  userId: number;
}

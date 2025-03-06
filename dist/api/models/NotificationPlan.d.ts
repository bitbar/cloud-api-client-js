import { NotificationChannel, NotificationScope } from './Notification';
export type NotificationPlan = {
    channel: NotificationChannel;
    contentTemplate: string;
    createTime: number;
    handlerEmail: string;
    handlerId: number;
    id: number;
    name: string;
    scope: NotificationScope;
    sentTime: number;
    subjectTemplate: string;
    updateTime: number;
};
export type NotificationPlanData = Pick<NotificationPlan, 'channel' | 'name'> & {
    notificationContent: string;
    notificationSubject: string;
    scope: NotificationScope;
};
export type NotificationPlanEditData = Omit<NotificationPlanData, 'channel'>;

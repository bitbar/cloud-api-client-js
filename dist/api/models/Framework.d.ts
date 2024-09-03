import { OsType } from './Enum';
import { UserFile } from './UserFile';
export type Framework = {
    accountId: number;
    accountName: string;
    canRunFromUI: boolean;
    createTime: number;
    description: string;
    documentationUrl: string;
    forProjects: boolean;
    icon: string;
    id: number;
    labelId: number;
    labelName: string;
    name: string;
    osType: OsType;
    queueWait: number;
    requiredAppExtensions: string;
    requiredTestExtensions: string;
    requiredTestFileTags: string;
    retryable: boolean;
    sampleApp: UserFile;
    sampleTest: UserFile;
    secured: boolean;
    skipOlderSdk: boolean;
    skipQueue: boolean;
    type: string;
};
export type FrameworkData = Omit<Framework, 'createTime' | 'id' | 'labelName' | 'accountName' | 'sampleApp' | 'sampleTest'> & {
    addLabelToDevices: boolean;
    roleIds: Array<number>;
    sampleAppId: number;
    sampleTestId: number;
};
export type FrameworkEditData = Omit<FrameworkData, 'accountId' | 'id' | 'secured'>;
export type FrameworkConfigData = {
    content: string;
};

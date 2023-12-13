import { OsType } from './Enum';
import { UserFile } from './UserFile';
export declare type Framework = {
    accountId: number;
    canRunFromUI: boolean;
    createTime: number;
    description: string;
    documentationUrl: string;
    forProjects: boolean;
    icon: string;
    id: number;
    labelId: number;
    labelName: string;
    mainUserEmail: string;
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
export declare type FrameworkData = Omit<Framework, 'createTime' | 'id' | 'labelName' | 'mainUserEmail' | 'sampleApp' | 'sampleTest'> & {
    addLabelToDevices: boolean;
    roleIds: Array<number>;
    sampleAppId: number;
    sampleTestId: number;
};
export declare type FrameworkEditData = Omit<FrameworkData, 'accountId' | 'id' | 'secured'>;
export declare type FrameworkConfigData = {
    content: string;
};

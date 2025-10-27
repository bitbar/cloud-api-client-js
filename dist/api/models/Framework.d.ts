import { OsType } from './Enum';
import { UserFile } from './UserFile';
export type FrameworkOptionsType = 'CLIENT_SIDE' | 'MANUAL' | '';
export type FrameworkOptions = {
    id: number;
    name: string;
    description: string;
    icon: string;
    type: FrameworkOptionsType;
    requiredAppExtensions: string;
    requiredTestExtensions: string;
    sampleApp: UserFile;
    sampleTest: UserFile;
};
export type Framework = FrameworkOptions & {
    accountId: number;
    accountName: string;
    canRunFromUI: boolean;
    createTime: number;
    documentationUrl: string;
    forProjects: boolean;
    labelId: number;
    labelName: string;
    osType: OsType;
    queueWait: number;
    requiredTestFileTags: string;
    retryable: boolean;
    secured: boolean;
    skipOlderSdk: boolean;
    skipQueue: boolean;
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

import {OsType} from "./Enum";
import {UserFile} from "./UserFile";

export type Framework = {
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
}

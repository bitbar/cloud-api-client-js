export type FileDirection = 'INPUT' | 'OUTPUT';
export type FileInputType = 'APPLICATION' | 'TEST' | 'DATA';
export type FileState = 'PREPARING' | 'READY';

export type FileProperty = {
  id: number;
  key: string;
  selfURI: string;
  value: string;
};

export type UserFile = {
  createTime: number;
  directUrl: string;
  direction: FileDirection;
  duplicate: boolean;
  fileProperties: Array<FileProperty>;
  iconDirectUrl: string;
  id: number;
  inputType: FileInputType;
  mimetype: string;
  name: string;
  selfURI: string;
  shared: boolean;
  size: number;
  state: FileState;
  userEmail: string;
  userId: number;
};

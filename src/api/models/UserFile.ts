import {CollectionQueryParams, QueryParams} from './HTTP';

export enum FileDirection {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

export enum FileInputType {
  APPLICATION = 'APPLICATION',
  TEST = 'TEST',
  DATA = 'DATA'
}

export enum FileState {
  PREPARING = 'PREPARING',
  READY = 'READY'
}

export type FileProperty = {
  id: number;
  key: string;
  value: string;
};

export type UserFileTag = {
  id: number;
  name: string
}

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
  shared: boolean;
  size: number;
  state: FileState;
  userEmail: string;
  userId: number;
};

export interface UserFileParams extends CollectionQueryParams {
  tag: Array<string>;
}

export type UserFileData = {
  file: FormData;
  global: boolean;
}

export type BuildLogsData = {
  deviceRunIds: Array<number>;
  projectId: number;
  userId: number;
}

export type BuildLogsParams = BuildLogsData;

export interface FileSizeData extends QueryParams {
  height: number;
  width: number;
}

import { APIEntity as OriginAPIEntity } from './APIEntity';
export type APIEntity = InstanceType<typeof OriginAPIEntity>;
export * from './class';
export * from './admin';
export * from './lists';
export * from './resources';

import {CollectionQueryParams} from '../models/HTTP';

export interface FilesQueryParams extends CollectionQueryParams {
  tag: Array<string>;
}

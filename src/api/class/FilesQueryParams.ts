import {CollectionQueryParams} from "../APIList";

export interface FilesQueryParams extends CollectionQueryParams {
  tag: Array<string>;
}

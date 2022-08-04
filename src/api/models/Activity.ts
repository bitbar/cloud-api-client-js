import {Method} from "axios";

export type Activity = {
  body: string;
  createTime: number;
  deprecatedResource: boolean;
  httpMethod: Uppercase<Method>;
  id: number;
  parameters: string;
  uri: string;
  userAgent: string;
  userEmail: string;
  userId: number;
}

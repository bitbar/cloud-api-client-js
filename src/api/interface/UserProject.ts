import {TestRunQueryParams} from "../APIListRuns";
import {Project} from "../models/Project";

export interface UserProjectQueryParams extends TestRunQueryParams {
  showStatistics: boolean;
}

export type UserProjectData = Pick<Project, 'name'>;

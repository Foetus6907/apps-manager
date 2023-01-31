export default interface User {
  id: string;
  fullname: string;
  emails: string[];
  detectionSources: string[];
  detectionDate: string;
  detectionDateTimestamp: number;
  creationDate: string | null;
  apps: App[];
  appsCount: number;
  objectID: string;
}

export interface App {
  sources: string[];
  id: string;
  date: string;
}

export interface UserPagination {
  count: number;
  nbPages: number;
  page: number;
  users: User[];
}

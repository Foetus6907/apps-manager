import { AppPagination } from "@/adapter/secondary/agolia/AppDTO";

export interface AppRepository {
  getApps(nextPage?: number, searchAppParam?: string): Promise<AppPagination>;
}

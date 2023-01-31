import { UserPagination } from "@/adapter/secondary/api/UserDTO";

export interface UserRepository {
  getUserByAppExternalId(appExternalId: string): Promise<UserPagination>;
}

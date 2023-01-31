import { UserPagination } from "@/adapter/secondary/api/UserDTO";

export interface UserRepository {
  getUserByAppExternalId(appExternalId: string): Promise<UserPagination>;
}

export class UserApiRepository implements UserRepository {
  async getUserByAppExternalId(appExternalId: string): Promise<UserPagination> {
    try {
      const response = await fetch(
        `http://localhost:3000/users?appExternalId=${appExternalId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userPagination = await response.json();
      return Promise.resolve(userPagination);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
}

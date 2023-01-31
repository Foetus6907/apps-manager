import { UserPagination } from "@/adapter/secondary/api/UserDTO";
import { UserRepository } from "@/port/UserRepository";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByAppExternalId(id: string): Promise<UserPagination> {
    return this.userRepository.getUserByAppExternalId(id);
  }
}

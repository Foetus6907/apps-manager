import { AppPagination } from "@/adapter/secondary/agolia/AppDTO";
import { AppRepository } from "@/port/AppRepository";

export class AppUseCase {
  constructor(private readonly appRepository: AppRepository) {}

  async getApps(nextPage?: number): Promise<AppPagination> {
    return this.appRepository.getApps(nextPage);
  }
}

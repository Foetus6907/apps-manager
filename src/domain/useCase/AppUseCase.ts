import App from "@/adapter/secondary/agolia/AppDTO";
import { AppRepository } from "@/adapter/secondary/agolia/AppAlgoliaRepository";

export class AppUseCase {
  constructor(private readonly appRepository: AppRepository) {}

  async getApps(): Promise<App[]> {
    return this.appRepository.getApps();
  }
}

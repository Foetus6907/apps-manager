import App, { AppPagination } from "@/adapter/secondary/agolia/AppDTO";
import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
import { Hit, SearchResponse } from "@algolia/client-search";
import { AppRepository } from "@/port/AppRepository";

export class AppAlgoliaRepository implements AppRepository {
  private client: SearchClient;
  private index: SearchIndex;
  constructor() {
    this.client = algoliasearch(
      "L92M1S2IT5",
      "cfe5d8055f78d1088e2f5b7cca2dfd05"
    );
    this.index = this.client.initIndex("apps");
  }
  async getApps(nextPage?: number): Promise<AppPagination> {
    try {
      const searchResponse: SearchResponse<App[]> = await this.index.search(
        "",
        {
          page: nextPage ? nextPage : 0,
        }
      );
      console.log("searchResponse", searchResponse);
      const appPagination: AppPagination = {
        nbHits: searchResponse.nbHits,
        nbPages: searchResponse.nbPages,
        page: searchResponse.page,
        apps: <Array<Hit<App>>>(<unknown>searchResponse.hits),
      };
      return Promise.resolve(appPagination);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
}

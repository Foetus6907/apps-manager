import App, { AppPagination } from "@/adapter/secondary/agolia/AppDTO";
import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
import { Hit, SearchResponse } from "@algolia/client-search";
import { AppRepository } from "@/port/AppRepository";

export class AppAlgoliaRepository implements AppRepository {
  private client: SearchClient;
  private index: SearchIndex;
  constructor() {
    this.client = algoliasearch(
      import.meta.env.VITE_ALGOLIA_APP_ID,
      import.meta.env.VITE_ALGOLIA_API_KEY
    );
    this.index = this.client.initIndex("apps");
  }
  async getApps(
    nextPage?: number,
    searchAppParam?: string
  ): Promise<AppPagination> {
    try {
      const searchResponse: SearchResponse<App[]> = await this.index.search(
        searchAppParam ? searchAppParam : "",
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

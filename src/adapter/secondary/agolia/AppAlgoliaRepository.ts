import App from "@/adapter/secondary/agolia/AppDTO";
import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";

export interface AppRepository {
  getApps(): Promise<App[]>;
}

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
  async getApps(): Promise<App[]> {
    try {
      const searchResponse = await this.index.search("test");
      console.error("searchResponse", searchResponse);
      const appsFromAlgolia = searchResponse.hits as App[];
      return Promise.resolve(appsFromAlgolia);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
}

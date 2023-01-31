import { createStore, Store } from "vuex";
import { UserPagination } from "@/adapter/secondary/api/UserDTO";
import { appUseCase, userUseCase } from "@/adapter/primary/main";
import App, { AppPagination } from "@/adapter/secondary/agolia/AppDTO";

interface State {
  userPagination: UserPagination;
  appPagination: AppPagination;
}

const store: Store<State> = createStore({
  state() {
    return {
      appPagination: {
        nbHits: 0,
        nbPages: 0,
        page: 0,
        apps: [],
      },
      userPagination: {
        count: 0,
        nbPages: 0,
        page: 0,
        users: [],
      },
    } as State;
  },
  mutations: {
    setApps(state, appPagination: AppPagination) {
      state.appPagination = {
        nbHits: appPagination.nbHits,
        nbPages: appPagination.nbPages,
        page: appPagination.page,
        apps: [...state.appPagination.apps, ...appPagination.apps],
      };
    },
    setUserPagination(state, userPagination: UserPagination) {
      state.userPagination = userPagination;
    },
  },
  actions: {
    getApps({ commit }) {
      return appUseCase
        .getApps()
        .then((appPagination) => {
          commit("setApps", appPagination);
          return Promise.resolve(appPagination.nbHits > 0);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    loadMoreApps({ commit, state: { appPagination } }) {
      return appUseCase
        .getApps(appPagination.page + 1)
        .then((appPagination: AppPagination) => {
          commit("setApps", appPagination);
          return Promise.resolve(appPagination.nbHits > 0);
        })
        .catch((e: any) => {
          return Promise.reject(e);
        });
    },
    getUserByAppExternalId({ commit }, id: string) {
      return userUseCase
        .getUserByAppExternalId(id)
        .then((usersPagination) => {
          commit("setUserPagination", usersPagination);
          return Promise.resolve(usersPagination.users.length > 0);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
  },
  getters: {
    getApps(state): AppPagination {
      return state.appPagination;
    },
    getUserPagination(state): UserPagination {
      return state.userPagination;
    },
    getCurrentApp(state): (selectedAppExternalId: string) => App | undefined {
      return (selectedAppExternalId) => {
        return state.appPagination.apps.find(
          (app) => app.externalId === selectedAppExternalId
        );
      };
    },
  },
});

export default store;

import { computed, ComputedRef, ref, Ref } from "vue";
import store from "@/adapter/primary/store/store";
import { AppPagination } from "@/adapter/secondary/agolia/AppDTO";
import { getUserByAppExternalId } from "@/adapter/primary/components/AppDetailsUILogic";

export const appPagination: ComputedRef<AppPagination> = computed(
  () => store.getters.getApps
);

export const getApps = async () => {
  try {
    displayErrorGetApps(false);
    await store.dispatch("getApps");
  } catch (e) {
    displayErrorGetApps(true);
  }
};

export const onLoadMoreApps = (
  index: number,
  done: (stop?: boolean) => void
) => {
  if (index !== 1 && hasMoreAppsToLoad.value && !isLoadingMore.value) {
    loadMore().finally(() => done(!hasMoreAppsToLoad.value));
  } else {
    done();
  }
};

export const selectedAppExternalId: Ref<string | undefined> = ref(undefined);
export const setSelectedAppExternalId = async (appExternalId: string) => {
  selectedAppExternalId.value = appExternalId;
  await getUserByAppExternalId(appExternalId);
};

export const isDisplayingErrorGetApps: Ref<boolean> = ref(false);
export const displayErrorGetApps = (e: boolean) => {
  isDisplayingErrorGetApps.value = e;
};

export const hasMoreAppsToLoad = computed(
  () => appPagination.value.nbPages >= appPagination.value.page + 1
);
const isLoadingMore = ref(false);
export const loadMore = () => {
  isLoadingMore.value = true;
  return store
    .dispatch("loadMoreApps")
    .then(() => {
      isLoadingMore.value = false;
    })
    .catch(() => {
      isLoadingMore.value = false;
    });
};

import { computed, ComputedRef, ref, Ref } from "vue";
import store from "@/adapter/primary/store/store";
import { selectedAppExternalId } from "@/adapter/primary/components/AppListUiLogic";
import { UserPagination } from "@/adapter/secondary/api/UserDTO";

export const isDisplayingErrorGetUserByExtAppId: Ref<boolean> = ref(false);
export const displayErrorGetUserByExtAppId = (e: boolean) => {
  isDisplayingErrorGetUserByExtAppId.value = e;
};
export const getUserByAppExternalId = async (
  appExternalId: string | undefined
) => {
  if (!appExternalId) {
    return;
  }
  displayErrorGetUserByExtAppId(false);
  try {
    await store.dispatch("getUserByAppExternalId", appExternalId);
  } catch (e) {
    displayErrorGetUserByExtAppId(true);
  }
};

export const currentApp = computed(() => {
  return store.getters.getCurrentApp(selectedAppExternalId.value);
});

export const userPagination: ComputedRef<UserPagination> = computed(
  () => store.getters.getUserPagination
);

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
<script setup lang="ts">
import { computed, ComputedRef, Ref, ref } from "vue";
import { UserPagination } from "@/adapter/secondary/api/UserDTO";
import { AppPagination } from "@/adapter/secondary/agolia/AppDTO";
import { useStore } from "vuex";

const store = useStore();

const isDisplayingErrorGetApps: Ref<boolean> = ref(false);
const displayErrorGetApps = (e: boolean) => {
  isDisplayingErrorGetApps.value = e;
};
const getApps = async () => {
  try {
    displayErrorGetApps(false);
    await store.dispatch("getApps");
  } catch (e) {
    displayErrorGetApps(true);
  }
};

getApps();
const appPagination: ComputedRef<AppPagination> = computed(
  () => store.getters.getApps
);

const userPagination: ComputedRef<UserPagination> = computed(
  () => store.getters.getUserPagination
);

const isDisplayingErrorGetUserByExtAppId: Ref<boolean> = ref(false);
const displayErrorGetUserByExtAppId = (e: boolean) => {
  isDisplayingErrorGetUserByExtAppId.value = e;
};
const getUserByAppExternalId = async (appExternalId: string) => {
  displayErrorGetUserByExtAppId(false);
  try {
    await store.dispatch("getUserByAppExternalId", appExternalId);
  } catch (e) {
    displayErrorGetUserByExtAppId(true);
  }
};

const scrollTargetRef = ref(null);

const hasMoreAppsToLoad = computed(
  () => appPagination.value.nbPages > appPagination.value.page + 1
);
const isLoadingMore = ref(false);
const loadMore = () => {
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

const onLoadMoreApps = (index: number, done: (stop?: boolean) => void) => {
  if (index !== 1 && hasMoreAppsToLoad.value && !isLoadingMore.value) {
    loadMore().finally(() => done(!hasMoreAppsToLoad.value));
  } else {
    done();
  }
};

const selectedAppExternalId: Ref<string | undefined> = ref(undefined);
const setSelectedAppExternalId = (appExternalId: string) => {
  selectedAppExternalId.value = appExternalId;
  getUserByAppExternalId(appExternalId);
};

const currentApp = computed(() => {
  return store.getters.getCurrentApp(selectedAppExternalId.value);
});
</script>

<template>
  <q-page class="row justify-center q-pa-sm flex">
    <q-card
      ref="scrollTargetRef"
      style="max-height: 93vh; overflow: auto"
      bordered
      class="col q-mr-sm overflow-auto"
    >
      <q-list bordered separator class="text-center">
        <q-infinite-scroll
          @load="onLoadMoreApps"
          :offset="250"
          :scroll-target="scrollTargetRef"
        >
          <q-item>
            <q-item-section> </q-item-section>
            <q-item-section> </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold"> # Users </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold"> YoY spend </q-item-label>
            </q-item-section>
          </q-item>
          <template v-if="appPagination.apps.length > 0">
            <q-item
              clickable
              v-ripple
              v-for="(app, i) in appPagination.apps"
              :key="i"
              @click="setSelectedAppExternalId(app.externalId)"
            >
              <q-item-section>
                <q-img
                  id="logo"
                  :src="app.logo"
                  :alt="app.name"
                  :ratio="1"
                  style="width: 50px; height: 50px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-h6">{{
                  app.name
                }}</q-item-label>
                <q-item-label caption>
                  Ext Id: {{ app.externalId }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">
                  {{ app.usersCount }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  YoY
                  {{ app.mainCurrencySymbol ?? "" }}
                  {{ app.currentRollingYearExpenses ?? "--" }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
      <template v-if="isDisplayingErrorGetApps">
        <q-banner inline-actions class="text-white bg-red">
          Une erreur est survenue lors de la récupération des utilisateurs.
          Veuillez réessayer ultérieurement.
        </q-banner>
      </template>
    </q-card>
    <q-card
      v-if="selectedAppExternalId && currentApp"
      bordered
      class="col-3 overflow-auto"
      style="max-height: 93vh; overflow: auto"
    >
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <q-img
          id="logo"
          :src="currentApp?.logo"
          :alt="currentApp?.name"
          :ratio="1"
          style="width: 120px; height: 120px"
        />
      </q-card-section>
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <q-item-label class="text-bold text-h4">
          {{ currentApp?.name }}
        </q-item-label>
      </q-card-section>
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <q-item-label caption>
          Ext Id: {{ currentApp?.externalId }}
        </q-item-label>
      </q-card-section>
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <p>
          {{ currentApp?.description }}
        </p>
      </q-card-section>
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <q-item-label class="text-bold">
          {{ currentApp?.usersCount }} users
        </q-item-label>
      </q-card-section>
      <q-card-section class="justify-center flex q-my-sm q-py-none">
        <template v-if="userPagination?.users.length > 0">
          <!--    List of users   ``users``  -->
          <q-list bordered separator class="text-center full-width">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold"> Name </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold"> Email </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              v-for="(user, i) in userPagination?.users"
              :key="i"
            >
              <q-item-section>
                <q-item-label class="ellipsis">
                  {{ user.fullname }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="col-auto">
                <q-item-label class="ellipsis">
                  {{ user.emails?.at(0) ?? "" }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
        <template v-if="isDisplayingErrorGetUserByExtAppId">
          <q-banner inline-actions class="text-white bg-red">
            Une erreur est survenue lors de la récupération des utilisateurs.
            Veuillez réessayer ultérieurement.
          </q-banner>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>

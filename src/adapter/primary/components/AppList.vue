<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppList",
});
</script>
<script setup lang="ts">
import {
  appPagination,
  getApps,
  onLoadMoreApps,
  setSelectedAppExternalId,
  isDisplayingErrorGetApps,
} from "@/adapter/primary/components/AppListUiLogic";
import { ref } from "vue";

const scrollTargetRef = ref(null);

getApps();
</script>

<template>
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
                style="width: 100%; max-width: 150px; max-height: 150px"
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
</template>

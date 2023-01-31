<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppDetail",
});
</script>
<script setup lang="ts">
import { selectedAppExternalId } from "@/adapter/primary/components/AppListUiLogic";

import {
  currentApp,
  userPagination,
  isDisplayingErrorGetUserByExtAppId,
  getUserByAppExternalId,
} from "@/adapter/primary/components/AppDetailsUILogic";

getUserByAppExternalId(selectedAppExternalId.value);
</script>

<template>
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
        style="width: 100%"
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
</template>

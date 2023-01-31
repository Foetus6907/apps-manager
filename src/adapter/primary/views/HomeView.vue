<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
<script setup lang="ts">
import AppList from "@/adapter/primary/components/AppList.vue";

import AppDetail from "@/adapter/primary/components/AppDetail.vue";
</script>

<template>
  <q-page class="row justify-center q-pa-sm flex">
    <AppList></AppList>
    <AppDetail></AppDetail>
  </q-page>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>

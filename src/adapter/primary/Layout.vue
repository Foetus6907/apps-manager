<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
name: "AppLayout",
});
</script>
<script setup lang="ts">
import logo from "@/adapter/primary/assets/img/img.png";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <img :src="logo" alt="logo" style="width: 256px" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>

<script setup lang="ts">
import logo from "@/adapter/primary/assets/img/img.png";
</script>

<template>
  <q-layout view="hHr lpr fFr" class="overflow-hidden-y">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <img :src="logo" alt="logo" style="width: 256px" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="overflow-hidden-y">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass" scoped>
#logo
  width: 15%

.q-header
  height: 5.5vh
.q-page-container
  height: calc(100% - 5.5vh)
</style>

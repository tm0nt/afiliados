<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="12">
        <VDataTable no-data-text="Nenhum dado para exibir" items-per-page-text="Links por página">
          <template v-slot:top>
            <v-toolbar rounded="sm" color="surface" flat>
              <v-toolbar-title>Links de divulgação</v-toolbar-title>
            </v-toolbar>
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </v-container>

  <navBar />
</template>
<script setup>
import { profileStore } from "~/store/profile";
import navBar from "@/components/navbar.vue";
const profile = profileStore();
definePageMeta({
  middleware: ["auth"],
});
</script>

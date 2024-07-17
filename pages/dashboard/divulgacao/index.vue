<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          no-data-text="Nenhum dado para exibir"
          items-per-page-text="Links por página"
        >
          <template v-slot:top>
            <v-toolbar rounded="sm" color="surface" flat>
              <v-toolbar-title>Links de divulgação</v-toolbar-title>
            </v-toolbar>
          </template>

          <template v-slot:item.link="{ item }">
            <v-chip variant="tonal" color="primary">{{ item.link }}</v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn size="x-small" append-icon="mdi-content-copy" color="primary" class="text-white" rounded="xl" @click="copyToClipboard(item.link)">
              Copiar
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <navBar />
</template>
<script setup>
import { profileStore } from "~/store/profile";
import navBar from "@/components/navbar.vue";

const profile = profileStore();

const headers = ref([
  { text: 'ID', value: 'id' },
  { text: 'NOME', value: 'name' },
  { text: 'Link', value: 'link' },
  { text: 'Ações', value: 'action', sortable: false },
]);

const items = ref([
  {
    id: "Seu link de indicação",
    name: profile.name,
    link: `https://grilo7.bet?ref=${profile.code}`,
  },
]);

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Link copiado para a área de transferência');
  });
};

definePageMeta({
  middleware: ["auth"],
});
</script>

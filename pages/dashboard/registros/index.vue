<template>
  <v-container>
    <VRow>
      <VCol cols="12">
        <v-text-field
          v-model="search"
          label="Pesquise"
          rounded="lg"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
        <v-data-table
          items-per-page-text="Registros por página"
          v-if="registros"
          no-data-text="Nenhum registro encontrado"
          :search="search"
          :items="registros"
          :headers="headers"
        >
        <template v-slot:top>
            <v-toolbar rounded="sm" color="surface" flat>
              <v-toolbar-title>Registros</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.createdAt="{ value }">
            <v-chip>
              {{ formatarData(value) }}
            </v-chip>
          </template>
        </v-data-table>
      </VCol>
    </VRow>
  </v-container>

  <navBar />
</template>

<script setup>
import { ref } from "vue";
import navBar from "@/components/navbar.vue";
definePageMeta({
  middleware: ["auth"],
});
const headers = [
  { title: "E-mail", key: "indicated" },
  { title: "Data de registro", key: "createdAt" },
];

const registros = ref(null);
const search = ref(null);

const cookie = useCookie("token");
const token = cookie.value;

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/registers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      registros.value = data?.register;
    }
  } catch (error) {
    console.error(error);
  }
};

const formatarData = (createdAt) => {
  const dataCriacao = new Date(createdAt);
  const dataAtual = new Date();
  const diff = Math.abs(dataAtual - dataCriacao); // diferença em milissegundos

  const umDia = 1000 * 60 * 60 * 24; // milissegundos em um dia

  if (diff < umDia) {
    return "Hoje";
  } else if (diff < umDia * 2) {
    return "há 1 dia";
  } else if (diff < umDia * 7) {
    const dias = Math.floor(diff / umDia);
    return `há ${dias} dias`;
  } else {
    return dataCriacao.toLocaleDateString(); // caso seja mais antigo, exibe a data completa
  }
};

fetchData();
</script>

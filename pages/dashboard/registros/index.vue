<template>
  <v-container>
    <VRow>
      <VCol cols="12">
        <h1 class="text-h5 font-weight-bold mb-10">Registros</h1>
        <v-text-field
          v-model="search"
          label="Pesquise"
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
          <template v-slot:item.created_at="{ value }">
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
  { title: "Nome", key: "name" },
  { title: "Data de registro", key: "created_at" },
];

const registros = ref(null);
const search = ref(null);

const cookie = useCookie("token");
const token = cookie.value;

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/registros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      registros.value = data.detalhes;
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

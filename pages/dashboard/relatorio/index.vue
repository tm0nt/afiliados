<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="4">
        <VCard rounded="xl" color="surface">
          <template v-slot:title>
            <p class="text-subtitle-1 text-medium-emphasis">CPA</p>
          </template>
          <template v-slot:subtitle>
            <h1 class="font-weight-bold">{{ formatCurrency(dataFetch?.CPA) }}</h1>
          </template>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard rounded="xl" color="surface">
          <template v-slot:title>
            <p class="text-subtitle-1 text-medium-emphasis">FTDs</p>
          </template>
          <template v-slot:subtitle>
            <h1 class="font-weight-bold">{{ formatCurrency(dataFetch?.FTD) }}</h1>
          </template>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard rounded="xl" color="surface">
          <template v-slot:title>
            <p class="text-subtitle-1 text-medium-emphasis">RevShare</p>
          </template>
          <template v-slot:subtitle>
            <h1 class="font-weight-bold">{{ formatCurrency(dataFetch?.Revshare) }}</h1>
          </template>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VDataTable :headers="headers" no-data-text="Nenhum dado para exibir" :items="items" items-per-page-text="Dados por página">
          <template v-slot:item.data="{item}">
            <p>{{ formatISODate(item.createdAt) }}</p>
          </template>
          <template v-slot:top>
            <v-toolbar rounded="sm" color="surface" flat>
              <v-toolbar-title>Relatório</v-toolbar-title>
            </v-toolbar>
          </template>
        </VDataTable>
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
const dataFetch = ref(null);
const cookie = useCookie("token");
const token = cookie.value;
const headers = [
  { title: "Data", key: "data" },
  { title: "QFTD", key:"qftd" },
  { title: "FTD", key:"ftd"},
  { title: "Visitas", key:"visits"},
  { title: "Registros", key:"registers"},
  { title: "CPA", key:"cpa"},
  { title: "Revshare", key:"revshare"},
  { title: "Saques", key:"withdraws"},
];

const items = ref([])

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/comission", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      dataFetch.value = data;
    }
  } catch (error) {
    console.error(error);
  }
};


const fetchReport = async () => {
  try{
    const data = await $fetch("https://api.grilo7.bet/api/data/report", {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(data){
      items.value = data?.userDataReport
    }
  }catch(error){
    console.error(error)
  }
};

function formatISODate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Função para formatar números em moeda BRL

const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "R$ 0,00";
  }
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

fetchData();
fetchReport();
</script>

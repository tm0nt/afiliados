<template>
    <v-container>
      <VRow>
        <VCol cols="12" md="4">
          <VCard rounded="xl" color="#101010">
            <template v-slot:title>
              <p class="text-subtitle-1 text-medium-emphasis">CPA</p>
            </template>
            <template v-slot:subtitle>
              <h1 class="font-weight-bold">{{ formatCurrency(dataFetch?.totalCPA) }}</h1>
            </template>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard rounded="xl" color="#101010">
            <template v-slot:title>
              <p class="text-subtitle-1 text-medium-emphasis">FTDs</p>
            </template>
            <template v-slot:subtitle>
              <h1 class="font-weight-bold">{{ formatCurrency(dataFetch?.totalFTDValue) }}</h1>
            </template>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard rounded="xl" color="#101010">
            <template v-slot:title>
              <p class="text-subtitle-1 text-medium-emphasis">RevShare</p>
            </template>
            <template v-slot:subtitle>
              <h1 class="font-weight-bold">R$ 0,00</h1>
            </template>
          </VCard>
        </VCol>
      </VRow>
    </v-container>
  
    <navBar />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import navBar from "@/components/navbar.vue";
  
  const dataFetch = ref(null);
  const cookie = useCookie("token");
  const token = cookie.value;
  
  const fetchData = async () => {
    try {
      const data = await $fetch("https://api.grilo7.bet/inviters", {
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
  
  // Função para formatar números em moeda BRL
  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      return 'R$ 0,00';
    }
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  fetchData();
  </script>
  
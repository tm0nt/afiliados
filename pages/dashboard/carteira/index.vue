<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="4">
        <VCard
          rounded="xl"
          class="mb-4"
          :title="formatCurrency(profile?.saldo)"
          color="primary"
          variant="tonal"
          subtitle="Saldo atual"
        >
          <VCardText>
            <VBtn block class="text-capitalize" @click="dialog = true">Solicitar saque</VBtn>
            <VAlert rounded="xl" class="mt-4" type="info" color="white" variant="tonal">
              <template v-slot:text>
                <p class="text-caption">1° saque: Mínimo 50 FTDs e R$ 300,00 de saldo</p>
              </template>
            </VAlert>
          </VCardText>
        </VCard>
        <VCard color="#101010" rounded="xl" class="mb-4">
          <template v-slot:title>
            <p class="text-subtitle-1 text-medium-emphasis">Comissões acumuladas</p>
          </template>
          <template v-slot:subtitle>
            <h1 class="font-weight-bold">R$ 0,00</h1>
          </template>
        </VCard>
        <VCard rounded="xl" color="#101010">
          <template v-slot:title>
            <p class="text-subtitle-1 text-medium-emphasis">Pagamentos já recebidos</p>
          </template>
          <template v-slot:subtitle>
            <h1 class="font-weight-bold">R$ 0,00</h1>
          </template>
        </VCard>
      </VCol>
      <VCol cols="12" md="8">
        <v-data-table :items="items" no-data-text="Nenhum saque encontrado" items-per-page-text="Saques por página">
          <template v-slot:top>
            <v-toolbar rounded="sm" color="#080808" flat>
              <v-toolbar-title>Saques solicitados</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </VCol>
    </VRow>
    <v-dialog v-model="dialog" width="450">
      <v-card rounded="xl" color="background">
        <v-card-title>
          <v-icon @click="dialog = false">mdi-close-circle</v-icon>
        </v-card-title>
        <v-card-text class="text-center">
          <v-form>
            <h1 class="text-subtitle-1">Escolha sua chave Pix</h1>
            <v-chip-group v-model="chaves" inline multiple class="mb-5">
              <v-chip text="CPF" variant="outlined" filter></v-chip>

              <v-chip text="Email" variant="outlined" filter></v-chip>

              <v-chip text="Celular" variant="outlined" filter></v-chip>

              <v-chip text="Chave aleatória" variant="outlined" filter></v-chip>
            </v-chip-group>
            <v-text-field label="Sua chave" type="text" prepend-inner-icon="mdi-key"></v-text-field>
            <v-text-field  type="number" hide-spin-buttons label="Valor de saque" prepend-inner-icon="mdi-coin"></v-text-field>
            <v-btn color="primary text-capitalize" block>Pedir saque</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

  <navBar />
</template>
<script setup>
import { profileStore } from "~/store/profile";
import navBar from "@/components/navbar.vue";
const chaves = ref(null);
const items = [
  {
    Data: "",
    Metodo: "",
    Valor: "",
    Status: "",
    Ação: "",
  },
];

const cookie = useCookie("token");
const token = cookie.value;
const profile = profileStore();
const dialog = ref(false);

const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


</script>

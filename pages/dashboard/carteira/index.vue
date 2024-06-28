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
            <VBtn block class="text-capitalize" rounded="xl" @click="saqueBreak">Solicitar saque</VBtn>
            <VAlert
              v-if="items.length == 0"
              rounded="xl"
              class="mt-4"
              type="info"
              color="white"
              variant="tonal"
            >
              <template v-slot:text>
                <p class="text-caption">1° saque: Mínimo => R$ 300,00 de saldo</p>
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
            <h1 class="font-weight-bold">{{ formatCurrency(totalAmountWithStatusApproved) }}</h1>
          </template>
        </VCard>
      </VCol>
      <VCol cols="12" md="8">
        <v-data-table
          :headers="headers"
          :items="items"
          no-data-text="Nenhum saque encontrado"
          items-per-page-text="Saques por página"
        >
          <template v-slot:top>
            <v-toolbar rounded="sm" color="#080808" flat>
              <v-toolbar-title>Saques solicitados</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.date="{ value }">
            <p>{{ formatISODate(value) }}</p>
          </template>
          <template v-slot:item.amount="{ value }">
            <p>{{ formatCurrency(value) }}</p>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              dark
            >
              {{ getStatusText(item.status) }}
            </v-chip>
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
          <v-form @submit.prevent="submit">
            <h1 class="text-subtitle-1">Escolha sua chave Pix</h1>
            <v-chip-group v-model="chaves" inline class="mb-5">
              <v-chip text="CPF" variant="outlined" filter value="cpf"></v-chip>
              <v-chip text="Email" variant="outlined" filter value="email"></v-chip>
              <v-chip text="Celular" variant="outlined" filter value="celular"></v-chip>
              <v-chip text="Chave aleatória" variant="outlined" filter value="aleatoria"></v-chip>
            </v-chip-group>
            <v-text-field
              label="Sua chave"
              v-model="chave"
              type="text"
              prepend-inner-icon="mdi-key"
            ></v-text-field>
            <v-text-field
              type="number"
              hide-spin-buttons
              label="Valor de saque"
              v-model="valorSaque"
              prepend-inner-icon="mdi-coin"
            ></v-text-field>
            <v-alert
              :type="alertMessage.type"
              rounded="xl"
              v-if="alertMessage.v"
              variant="tonal"
              class="mb-4 mt-n2"
              >{{ alertMessage.text }}</v-alert
            >
            <v-btn color="primary text-capitalize" type="submit" block>Pedir saque</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
  <VSnackbar v-model="snackbar.v" :color="snackbar.color" rounded="xl">{{
    snackbar.text
  }}</VSnackbar>
  <navBar />
</template>

<script setup>
import { profileStore } from "~/store/profile";
import navBar from "@/components/navbar.vue";

definePageMeta({
  middleware: ["auth"],
});

const alertMessage = ref({
  v: false,
  text: null,
  type: null,
});

const chaves = ref(null);
const valorSaque = ref(null);
const chave = ref(null);
const snackbar = ref({
  v: false,
  color: null,
  text: null,
});

const headers = [
  { title: "Data", key: "date" },
  { title: "Valor", key: "amount" },
  { title: "Chave", key: "pix" },
  { title: "Status", key: "status" },
];

const items = ref([]);

const cookie = useCookie("token");
const token = cookie.value;
const profile = profileStore();
const dialog = ref(false);

const saqueBreak = async () => {
  try {
    if (items.value.length == 0 && profile.saldo <= 300) {
      snackbar.value.v = true;
      snackbar.value.color = "red";
      snackbar.value.text = "Você não possui requisitos mínimos para sacar!";
      return;
    } else {
      dialog.value = true;
    }
  } catch (error) {
    //
  }
};

const submit = async () => {
  try {
    if (profile.saldo < valorSaque.value) {
      snackbar.value.v = true;
      snackbar.value.color = "red";
      snackbar.value.text = "Você não tem saldo suficiente!";
      return;
    }
    if (!chaves.value || !valorSaque.value || !chave.value) {
      alertMessage.value.v = true;
      alertMessage.value.type = "error";
      alertMessage.value.text = "Preencha todos os campos!";
      return;
    }
    const data = await $fetch("https://api.grilo7.bet/withdraw", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: chaves.value,
        pix: chave.value,
        amount: valorSaque.value,
      }),
    });
    if (data) {
      fetchData();
      snackbar.value.v = true;
      snackbar.value.color = "success";
      snackbar.value.text = "Saque solicitado!";
      return navigateTo("http://localhost:3000/dashboard/carteira", {
        external: true,
      });
    }
  } catch (error) {
    snackbar.value.v = true;
    snackbar.value.color = "red";
    snackbar.value.text = error.data.error;
  }
};

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/withdraw", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      items.value = data;
      totalAmountWithStatusApproved.value = calculateSumWithStatus(items.value, 1);
    }
  } catch (error) {
    //
  }
};

const totalAmountWithStatusApproved = ref(null);

const calculateSumWithStatus = (items, status) => {
  return items.reduce((total, item) => {
    return item.status === status ? total + item.amount : total;
  }, 0);
};

function getStatusColor(status) {
  switch (status) {
    case 1:
      return "green";
    case 422:
      return "red";
    case 16:
      return "yellow";
    default:
      return "grey";
  }
}

function getStatusText(status) {
  switch (status) {
    case 1:
      return "Aprovado";
    case 422:
      return "Rejeitado";
    case 16:
      return "Aguardando";
    default:
      return "Desconhecido";
  }
}

function formatISODate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "R$ 0,00";
  }
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

fetchData();
</script>

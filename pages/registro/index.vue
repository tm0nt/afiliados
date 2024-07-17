<template>
  <v-container class="fill-height">
    <v-row no-gutters align="center" justify="center" class="fill-height">
      <VCol class="hidden-md-and-down fill-height" md="6">
        <VImg src="https://parceiros.grilo7.com/images/happy-work.webp" class="h-100"> </VImg>
      </VCol>
      <v-col cols="12" md="6">
        <v-img src="https://grilo7.bet/storage/logo.webp" class="mx-auto my-2" width="180"></v-img>
        <v-card
          class="mx-auto"
          color="transparent"
          rounded="xl"
          flat
          elevation="0"
          max-width="400"
        >
          <v-card-text>
            <h1 class="text-center text-subtitle-1 mb-4">Faça seu cadastro</h1>
            <v-form @submit.prevent="submit">
              <v-text-field
                placeholder="Nome completo"
                type="text"
                v-model="nome"
                class="mb-n4"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                placeholder="Email"
                type="email"
                v-model="email"
                prepend-inner-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                placeholder="Senha"
                :type="show1 ? 'text' : 'password'"
                prepend-inner-icon="mdi-password"
                :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="show1 = !show1"
                v-model="password"
                class="mt-n4"
              ></v-text-field>
              <v-text-field
                placeholder="Confirmar senha"
                :type="show2 ? 'text' : 'password'"
                prepend-inner-icon="mdi-password"
                :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="show2 = !show2"
                v-model="confirmPassword"
                class="mt-n4"
              ></v-text-field>
              <v-alert
                :type="alertMessage.type"
                rounded="xl"
                v-if="alertMessage.v"
                variant="tonal"
                class="mb-4 mt-n2"
                >{{ alertMessage.text }}</v-alert
              >
              <v-btn color="primary" :loading="loading" block class="text-capitalize text-white" type="submit">Cadastrar</v-btn>
            </v-form>

            <v-btn
              color="primary"
              class="mx-auto mt-2  text-capitalize"
              block
              variant="outlined"
              rounded="xl"
              to="/login"
              >Ou faça login</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { profileStore } from "~/store/profile";

definePageMeta({
  middleware: ["login"],
});
const storedProfile = profileStore();
const cookie = useCookie("token");
const nome = ref(null);
const email = ref(null);
const show1 = ref(false);
const show2 = ref(false)
const password = ref(null);
const loading = ref(false)
const confirmPassword = ref(null);
const alertMessage = ref({
  v: false,
  text: null,
  type: null,
});

const submit = async () => {
  try {
    loading.value = true;
    if(password.value != confirmPassword.value){
      alertMessage.value.v = true;
      alertMessage.value.type = "red";
      alertMessage.value.text = "Senhas não são iguais!";
      return;
    }
    const data = await $fetch("https://api.grilo7.bet/api/users/register", {
      method: "post",
      body: JSON.stringify({
        name: nome.value,
        email: email.value,
        password: confirmPassword.value,
        welcome: true,
      }),
    });
    if (data) {
      loading.value = false;
      storedProfile.setAuth(true);
      alertMessage.value.v = true;
      alertMessage.value.type = "success";
      alertMessage.value.text = "Login autorizado!";
      const token = data.token;
      cookie.value = token;
      return navigateTo("https://afiliados.grilo7.bet/dashboard/", {
        external: true,
      });
    }
  } catch (error) {
    loading.value = false;
    alertMessage.value.v = true;
    alertMessage.value.type = "error";
    alertMessage.value.text = error.data.message;
  }
};
</script>

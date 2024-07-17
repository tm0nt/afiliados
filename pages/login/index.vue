<template>
    <v-container class="fill-height">
  <v-row no-gutters align="center" justify="center" class="fill-height">
    <VCol class="hidden-md-and-down fill-height" md="6">
        <VImg
          src="https://parceiros.grilo7.com/images/happy-work.webp"
          class="h-100 "
        >
        </VImg>
      </VCol>
      <v-col cols="12" md="6">
  <v-img
    src="https://grilo7.bet/storage/logo.webp"
    class="mx-auto my-2"
    width="180"
  ></v-img>
  <v-card class="mx-auto pa-12 pb-12" color="transparent" rounded="xl" flat elevation="0" width="400">
    <v-card-text>
      <h1 class="text-center text-subtitle-1  mb-4">Faça seu login</h1>
      <v-form @submit.prevent="submit">
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
        <v-alert
          :type="alertMessage.type"
          rounded="xl"
          v-if="alertMessage.v"
          variant="tonal"
          class="mb-4 mt-n2"
          >{{ alertMessage.text }}</v-alert
        >
        <p class="text-caption text-medium-emphasis text-center mb-2">
          <v-icon>mdi-lock</v-icon>&nbsp; Seus dados estão protegidos.
        </p>
        <v-btn :loading="loading" color="primary" block class="text-capitalize" type="submit">Entrar</v-btn>

      </v-form>
      <v-btn
    color="primary"
    class="mx-auto mt-2 d-flex text-capitalize"
    width="400"
    variant="outlined"
    rounded="xl"
    to="/registro"
    >Ou Crie sua conta</v-btn
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
const loading = ref(false)
const email = ref(null);
const show1 = ref(false)
const password = ref(null);
const alertMessage = ref({
  v: false,
  text: null,
  type: null,
});

const submit = async () => {
  try {
    loading.value = true;
    const data = await $fetch("https://api.grilo7.bet/api/auth/login", {
      method: "post",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (data) {
      loading.value = false;
      storedProfile.setAuth(true)
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

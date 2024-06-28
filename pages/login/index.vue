<template>
  <v-img
    src="https://grilo7.bet/storage/logo.png"
    class="mx-auto my-12"
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
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
        <v-btn color="primary" block class="text-capitalize" type="submit">Entrar</v-btn>
        <p class="text-caption text-medium-emphasis text-center mt-2">
          <v-icon>mdi-lock</v-icon>&nbsp; Seus dados estão protegidos.
        </p>
      </v-form>
      <p class="text-center text-caption my-4 mb-4">Ou</p>

      <v-btn
    color="primary"
    class="mx-auto d-flex text-capitalize"
    width="400"
    variant="outlined"
    rounded="xl"
    href="https://grilo7.bet"
    >Crie sua conta</v-btn
  >
    </v-card-text>
  </v-card>

</template>

<script setup>
import { profileStore } from "~/store/profile";

definePageMeta({
  middleware: ["login"],
});
const storedProfile = profileStore();
const cookie = useCookie("token");
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
    const data = await $fetch("https://api.grilo7.bet/auth/login", {
      method: "post",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (data) {
      storedProfile.setAuth(true)
      alertMessage.value.v = true;
      alertMessage.value.type = "success";
      alertMessage.value.text = "Login autorizado!";
      const token = data.token;
      cookie.value = token;
      return navigateTo("https://grilo7.bet/dashboard/", {
        external: true,
      });
    }
  } catch (error) {
    alertMessage.value.v = true;
    alertMessage.value.type = "error";
    alertMessage.value.text = error.data.error;
  }
};
</script>

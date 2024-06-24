<template>
  <v-img
    src="https://vizzion.bet/storage/logovizzion1.png"
    class="mx-auto my-12"
    width="150"
  ></v-img>
  <v-card class="mx-auto pa-12 pb-12" color="#151515" rounded="xl" elevation="8" width="400">
    <v-card-text>
      <h1 class="text-center text-overline mb-4 text-primary">Faça seu login</h1>
      <v-form @submit.prevent="submit">
        <v-text-field placeholder="Email" type="email" v-model="email" prepend-inner-icon="mdi-email"></v-text-field>
        <v-text-field
          placeholder="Senha"
          prepend-inner-icon="mdi-password"
          type="password"
          append-inner-icon="mdi-eye"
          v-model="password"
          class="mt-n4"
        ></v-text-field>
        <v-btn color="primary" block class="text-capitalize" type="submit">Entrar</v-btn>
        <p class="text-caption text-medium-emphasis text-center mt-2">
          <v-icon>mdi-lock</v-icon>&nbsp; Seus dados estão protegidos.
        </p>
      </v-form>
    </v-card-text>
  </v-card>
  <p class="text-center text-caption my-4 mb-4">Ou</p>
  <v-btn color="primary" class="mx-auto d-flex text-capitalize" width="400" to="/registro">Crie sua conta</v-btn>
</template>

<script setup>
const cookie = useCookie("token");
const email = ref(null);
const password = ref(null);

const submit = async () => {
  try{
    const data = await $fetch("https://api.grilo7.bet/auth/login", {
      method: "post",
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    if(data){
      const token = data.token
      cookie.value = token
      await navigateTo("/dashboard/")
    }

  }catch(error){
    console.error(error);
  }
};

</script>

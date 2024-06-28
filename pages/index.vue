<template>
  <v-img
    src="https://grilo7.bet/storage/logo.png"
    width="180"
    class="mx-auto my-12"
  ></v-img>
  <v-card class="mx-auto pa-12 pb-12" color="#151515" rounded="xl" >
    <v-card-text class="text-center">
      <v-row>
        <v-col cols="12" md="5">
          <h1 class="text-subtitle-1 font-weight-bold text-primary">INSCREVA-SE</h1>
          <p class="text-caption text-medium-emphasis">Faça sua inscrição!</p>
          <v-btn block color="primary my-4" href="https://grilo7.bet">CRIE SUA CONTA</v-btn>
        </v-col>
        <v-col md="1"></v-col>
        <v-divider vertical inset class="d-none d-md-flex d-sm-none"></v-divider>
        <v-divider horizontal inset class="d-none d-sm-flex d-md-none"></v-divider>
        <v-col cols="12" md="5" class="ml-md-10">
          <h1 class="text-subtitle-1 font-weight-bold text-primary">FAÇA LOGIN</h1>
          <p class="text-caption text-medium-emphasis">Entre com sua conta.</p>
          <v-btn block color="primary my-4" to="/login">JÁ SOU MEMBRO</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup></script>

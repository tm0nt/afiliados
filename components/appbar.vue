<template>
  <v-app-bar :elevation="1" color="background">
    <v-app-bar-title>
          <v-img src="https://grilo7.bet/storage/logo.webp" width="120"></v-img>
    </v-app-bar-title>
    <template v-slot:append>
          <v-chip to="/login" variant="elevated" prepend-icon="mdi-logout" size="large" color="primary">Login</v-chip>
        </template>
  </v-app-bar>
</template>

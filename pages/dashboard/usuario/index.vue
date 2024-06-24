<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="4">
        <h1 class="text-h5 mb-5 font-weight-bold">Detalhes da conta</h1>
        <VCard rounded="xl">
          <VCardText>
            <v-form>
              <v-text-field label="Nome" :model-value="profile?.nome" ></v-text-field>
              <v-text-field label="Celular" :model-value="profile?.phone" ></v-text-field>
              <v-text-field label="Link afiliado" :model-value="profile?.code" append-inner-icon="mdi-content-copy" ></v-text-field>
            </v-form>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </v-container>

  <navBar />
</template>
<script setup>
import { profileStore } from "~/store/profile";
import navBar from "@/components/navbar.vue";
const profile = profileStore();
</script>

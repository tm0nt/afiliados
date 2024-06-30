<template>
  <div>
    <NuxtPwaAssets />
    <NuxtLayout>

      <NuxtPage />

    </NuxtLayout>
    
    <VDialog v-model="dialog" width="600" color="background" persistent>
      <VCard rounded="xl" >
        <VCardTitle>
          <VIcon @click="dialog = false">mdi-close-circle</VIcon>
        </VCardTitle>
        <VCardText class="text-center">
          <h1 class="text-subtitle-1">
            Escolha seu plano
          </h1>
          <VRow class="mt-4">
            <VCol cols="12">
              <VBtn class="mb-n4 text-capitalize" @click="insertPlanAffiliate(1)" color="primary" block>Apenas CPA (30/30)</VBtn>
            </VCol>
            <VCol cols="12">
              <VBtn class="mb-n4 text-capitalize" @click="insertPlanAffiliate(2)" color="primary" block>Apenas RevShare (60%)</VBtn>
            </VCol>
            <VCol cols="12">
              <VBtn color="primary" class="text-capitalize" @click="insertPlanAffiliate(3)" block>Revshare+CPA(60% + 30/30)</VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
    <VSnackbar v-model="snackbar" color="success" rounded="xl">Plano selecionado com sucesso!</VSnackbar>

  </div>
</template>
<script setup>
import { profileStore } from "~/store/profile";

const storedProfile = profileStore()
const cookie = useCookie("token");
const token = cookie.value
const dialog = ref(false)
const snackbar = ref(false)
const insertPlanAffiliate = async (id) => {
  try{
    const data = await $fetch("https://api.grilo7.bet/affiliate_config", {
      method: "post",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({
        planId: id
      })
    })
    if(data){
      snackbar.value = true
      dialog.value = false
      return navigateTo("https://afiliados.grilo7.bet/dashboard",{
        external: true
      })
    }
  }catch(error){
    console.error(error)
  }
}

const dialogAffiliate = async () => {
  try{
    if(storedProfile.affiliate_plan == false && storedProfile.auth == true){
      dialog.value = true
    }
    else{
      dialog.value = false
    }
  }catch(error){
    console.error(error)
  }
};
dialogAffiliate()
</script>

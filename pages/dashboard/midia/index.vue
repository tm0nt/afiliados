<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="12">
        <VCard rounded="xl" color="#101010" title="Mídia de divulgação">
          <VRow class="ma-10">
            <VCol cols="6" md="2">
              <VCard
                height="150"
                rounded="xl"
                image="https://img.elegantflyer.com/templates/preview/casino-free-flyer-psd-template-119776.jpg"
              >
              </VCard>
            </VCol>
            <VCol cols="6" md="2">
              <VCard
                height="150"
                rounded="xl"
                image="https://img.elegantflyer.com/templates/preview/casino-free-flyer-psd-template-119776.jpg"
              >
              </VCard>
            </VCol>
            <VCol cols="6" md="2">
              <VCard
                height="150"
                rounded="xl"
                image="https://img.elegantflyer.com/templates/preview/casino-free-flyer-psd-template-119776.jpg"
              >
              </VCard>
            </VCol>
          </VRow>
          <VBtn variant="tonal" color="primary" block>VER DRIVE</VBtn>
        </VCard>
      </VCol>
    </VRow>
  </v-container>

  <navBar />
</template>
<script setup>
import navBar from "@/components/navbar.vue";
definePageMeta({
  middleware: ["auth"],
});
</script>

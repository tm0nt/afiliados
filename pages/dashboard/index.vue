<template>
  <v-container>
    <VRow>
      <VCol cols="12" md="6">
        <Chart1
          :title="RegistrosTitle"
          chartType="spline"
          v-if="xCategoriesRegistros && seriesDataRegistros"
          :xCategories="xCategoriesRegistros"
          :seriesData="seriesDataRegistros"
          seriesName="Registros"
          :yAxisVisible="false"
          :markerEnabled="false"
        />
      </VCol>
      <VCol cols="12" md="6">
        <Chart1
          :title="ftdTitle"
          chartType="spline"
          v-if="xCategoriesFTD && seriesDataFTD"
          :xCategories="xCategoriesFTD"
          :seriesData="seriesDataFTD"
          seriesName="FTDs"
          :yAxisVisible="false"
          :markerEnabled="false"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <Chart1
          :title="qftdTitle"
          chartType="spline"
          v-if="xCategoriasQFTD && seriesDataQFTD"
          :xCategories="xCategoriasQFTD"
          :seriesData="seriesDataQFTD"
          seriesName="qFTD"
          :yAxisVisible="false"
          :markerEnabled="false"
        />
      </VCol>
      <VCol cols="12" md="6">
        <Chart1
          :title="visitasTitle"
          chartType="spline"
          v-if="xCategoriesVisitas && seriesDataVisitas"
          :xCategories="xCategoriesVisitas"
          :seriesData="seriesDataVisitas"
          seriesName="Visitas"
          :yAxisVisible="false"
          :markerEnabled="false"
        />
      </VCol>
    </VRow>
  </v-container>

  <navBar />
</template>

<script setup>
import Chart1 from "@/components/chart/ch.vue";
import navBar from "@/components/navbar.vue";
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const cookie = useCookie("token");
const token = cookie.value;
const xCategoriesRegistros = ref(null);
const seriesDataRegistros = ref(null);
const RegistrosTitle = ref("Gráfico");
const ftdTitle = ref("Gráfico");
const xCategoriesFTD = ref(null);
const seriesDataFTD = ref(null);
const xCategoriasQFTD = ref(null);
const seriesDataQFTD = ref(null);
const xCategoriesVisitas = ref(null);
const qftdTitle = ref(null);
const seriesDataVisitas = ref(null);
const visitasTitle = ref(null);

const fetchDataFTD = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/chart/ftd", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      xCategoriesFTD.value = Object.keys(data).sort();
      seriesDataFTD.value = xCategoriesFTD.value.map((date) => data[date]);
      const totalNumeroFTDs = seriesDataFTD.value.reduce((total, numFTDs) => total + numFTDs, 0);
      ftdTitle.value = `FTDs: ${totalNumeroFTDs}`;
    }
  } catch (error) {
    console.error(error);
  }
};
const fetchDataQFTD = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/chart/qftd", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      xCategoriasQFTD.value = Object.keys(data).sort();
      seriesDataQFTD.value = xCategoriasQFTD.value.map((date) => data[date]);
      const totalNumeroFTDs = seriesDataQFTD.value.reduce((total, numFTDs) => total + numFTDs, 0);
      qftdTitle.value = `QFTDs: ${totalNumeroFTDs}`;
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchDataVisit = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/chart/visit", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      xCategoriesVisitas.value = Object.keys(data).sort();
      seriesDataVisitas.value = xCategoriesVisitas.value.map((date) => data[date]);
      const totalVisitas = seriesDataVisitas.value.reduce((total, numFTDs) => total + numFTDs, 0);
      visitasTitle.value = `Visitas: ${totalVisitas}`;
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchDataRegister = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/api/data/chart/register", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      xCategoriesRegistros.value = Object.keys(data).sort();
      seriesDataRegistros.value = xCategoriesRegistros.value.map((date) => data[date]);
      const totalVisitas = seriesDataRegistros.value.reduce((total, numFTDs) => total + numFTDs, 0);
      RegistrosTitle.value = `Registros: ${totalVisitas}`;
    }
  } catch (error) {
    console.error(error);
  }
};

fetchDataFTD();
fetchDataVisit();
fetchDataRegister();
fetchDataQFTD();
</script>

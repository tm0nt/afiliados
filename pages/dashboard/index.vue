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
      <VCol cols="12" md="12">
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

const cookie = useCookie("token");
const token = cookie.value;
const xCategoriesRegistros = ref(null);
const seriesDataRegistros = ref(null);
const RegistrosTitle = ref("Gráfico");
const ftdTitle = ref("Gráfico");
const xCategoriesFTD = ref(null);
const seriesDataFTD = ref(null);
const xCategoriesVisitas = ref(null);
const seriesDataVisitas = ref(null);
const visitasTitle = ref(null); 

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      // Registros
      const registros = data.registros;
      xCategoriesRegistros.value = registros.map((item) => item.createdAt);
      seriesDataRegistros.value = registros.map((item) => item.numeroDeRegistros);
      const totalNumeroDeRegistros = registros.reduce((total, registro) => {
        return total + registro.numeroDeRegistros;
      }, 0);
      RegistrosTitle.value = `Registros: ` + totalNumeroDeRegistros;

      // FTDs
      const ftd = data.FTDs;
      xCategoriesFTD.value = ftd.map((item) => item.createdAt);
      seriesDataFTD.value = ftd.map((item) => item.numeroDeFTDs);
      const totalNumeroFTDs = ftd.reduce((total, ftds) => {
        return total + ftds.numeroDeFTDs;
      }, 0);
      ftdTitle.value = `FTDs: ` + totalNumeroFTDs;
      
      // Visitas
      const visitas = data.dailyVisit;

      const datasUnicas = Array.from(
        new Set(visitas.map((item) => new Date(item.visit_date).toISOString().split("T")[0]))
      );
      datasUnicas.sort();
      xCategoriesVisitas.value = datasUnicas;

      // Contar o número de visitas por data
      const visitasPorData = {};
      for (const visita of visitas) {
        const dataVisita = new Date(visita.visit_date).toISOString().split("T")[0];
        if (!visitasPorData[dataVisita]) {
          visitasPorData[dataVisita] = 0;
        }
        visitasPorData[dataVisita]++;
      }

      // Mapear os valores da série (quantidade de visitas por dia)
      seriesDataVisitas.value = Object.values(visitasPorData);

      // Calcular o total de visitas
      const totalNumeroVisitas = visitas.reduce((total, visita) => {
        return total + 1; // Conta cada visita individualmente
      }, 0);

      // Atualizar o título com o total de visitas
      visitasTitle.value = `Visitas: ${totalNumeroVisitas}`;
    }
  } catch (error) {
    console.error(error);
  }
};

fetchData();
</script>

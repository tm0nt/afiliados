<template>
  <VCard rounded="xl" color="surface" variant="elevated">
    <VCardTitle class="text-caption ma-2">{{ title }}</VCardTitle>
    <v-divider></v-divider>
    <highchart class="mt-2" :options="chartOptions" />
  </VCard>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Gráfico"
  },
  chartType: {
    type: String,
    default: "spline",
  },
  xCategories: {
    type: Array,
    required: true,
  },
  seriesData: {
    type: Array,
    required: true,
  },
  seriesName: {
    type: String,
    default: "Series",
  },
  yAxisVisible: {
    type: Boolean,
    default: false,
  },
  markerEnabled: {
    type: Boolean,
    default: false,
  },

});

const chartOptions = computed(() => ({
  chart: {
    type: props.chartType,
    backgroundColor: "transparent",
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: props.xCategories,
  },
  yAxis: {
    title: {
      text: "",
    },
    gridLineWidth: 0,
    visible: props.yAxisVisible,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 3,
        enabled: props.markerEnabled,
      },
    },
    line: {
      dataLabels: {
        enabled: true,
      },
      enableMouseTracking: true,
      color: "primary",
    },
    pie: {
      borderWidth: 0,
    },
  },
  legend: {
    itemStyle: {
      color: "#00d500",
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    formatter: function () {
      return `<b>${this.series.name}</b><br>${this.x}: ${this.y}`;
    },
  },
  dataLabels: {
    style: {
      color: "#f0f0f0",
    },
  },
  series: [
    {
      name: props.seriesName,
      data: props.seriesData,
      color: "#00d500",
    },
  ],
  accessibility: {
    enabled: false,
  },
}));
</script>

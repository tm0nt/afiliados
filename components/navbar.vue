<template>
  <v-app-bar :elevation="0" color="background">
    <template v-slot:prepend>
      <v-app-bar-nav-icon class="d-none d-md-flex" @click.stop="rail = !rail"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-row>
        <v-col cols="1" class="d-md-none">
          <v-icon @click="dialog = true">mdi-menu</v-icon>
        </v-col>
        <v-col cols="10" md="3">
          <v-img
            class="ml-6 ml-md-0"
            src="https://grilo7.bet/storage/logo.png"
            width="120"
          ></v-img>
        </v-col>
      </v-row>
    </v-app-bar-title>

    <template v-slot:append>
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-account"
            size="large"
            class="d-none d-md-flex ma-1"
            v-bind="props"
          ></v-btn>
        </template>
        <v-list nav rounded="xl">
          <v-list-item prepend-icon="mdi-face-agent" title="Suporte"> </v-list-item>
          <v-list-item
            prepend-icon="mdi-currency-usd-circle"
            title="Meu saldo"
            to="/dashboard/carteira"
          >
          </v-list-item>
          <v-list-item title="Logout" @click="logout" prepend-icon="mdi-logout"> </v-list-item>
        </v-list>
      </v-menu>
      <v-chip variant="outlined" class="ma-1">
        {{ formatCurrency(profile?.saldo) }}
        <template v-slot:append>
          <v-icon color="primary" class="ma-1 mr-n2">mdi-coin</v-icon>
        </template>
      </v-chip>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-account"
            variant="outlined"
            fab
            rounded="xl"
            class="d-md-none ma-1"
            v-bind="props"
          ></v-btn>
        </template>
        <v-list nav rounded="xl">
          <v-list-item prepend-icon="mdi-face-agent" title="Suporte"> </v-list-item>
          <v-list-item
            prepend-icon="mdi-currency-usd-circle"
            title="Meu saldo"
            to="/dashboard/carteira"
          >
          </v-list-item>
          <v-list-item title="Logout" @click="logout" prepend-icon="mdi-logout"> </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    color="background"
    class="d-none d-md-flex"
  >
    <v-list nav>
      <v-list-item rounded="xl">
        <template v-slot:prepend>
          <v-avatar
            :size="avatarSize"
            image="https://i.imgur.com/cSNtckz.png"
          >
          </v-avatar>
        </template>
        <template v-slot:title>
          <h1 class="text-subtitle-1 font-weight-bold">{{ profile?.nome }}</h1>
          <p class="text-caption text-medium-emphasis mt-n2">Iniciante</p>
        </template>
        <template v-slot:subtitle>
          <v-chip size="small" color="primary">{{planName}}</v-chip>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        rounded="xl"
        to="/dashboard/"
        prepend-icon="mdi-home"
        title="Dashboard"
        value="Dashboard"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        prepend-icon="mdi-chart-box"
        title="Relatório"
        value="relatorio"
        to="/dashboard/relatorio"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        to="/dashboard/midia"
        prepend-icon="mdi-image"
        title="Mídia/banners"
        value="midia"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        to="/dashboard/registros"
        title="Registros"
        prepend-icon="mdi-account-plus"
        value="Registros"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        title="Carteira"
        prepend-icon="mdi-wallet-bifold"
        value="carteira"
        to="/dashboard/carteira"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        title="Nível e progresso"
        to="/dashboard/nivel"
        prepend-icon="mdi-medal"
        :disabled="true"
        value="nivel"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        title="Links de divulgação"
        prepend-icon="mdi-account"
        to="/dashboard/divulgacao"
        value="conta"
      ></v-list-item>
      <v-list-item
        rounded="xl"
        color="primary"
        title="Área de membros"
        :variant="!rail ? 'outlined' : ''"
        :disabled="true"
        prepend-icon="mdi-account-school"
        value="area"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-img
              class="mt-4"
              src="https://vizzion.bet/storage/logovizzion1.png"
              width="140"
            ></v-img>
          </v-col>
          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="white"
              fab
              rounded="xl"
              variant="text"
              size="x-large"
              @click="dialog = false"
              icon="mdi-close-circle"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-list nav>
                    <v-list-item rounded="xl">
                      <template v-slot:prepend>
                        <v-avatar
                          :size="avatarSize"
                          image="https://i.imgur.com/cSNtckz.png"
                        >
                        </v-avatar>
                      </template>
                      <template v-slot:title>
                        <h1 class="text-subtitle-1 font-weight-bold">{{ profile?.nome }}</h1>
                        <p class="text-caption text-medium-emphasis mt-n2">Iniciante</p>
                      </template>
                      <template v-slot:subtitle>
                        <v-chip size="small" color="primary">{{planName}}</v-chip>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12">
                  <v-list nav>
                    <v-list-item
                      rounded="xl"
                      to="/dashboard/"
                      prepend-icon="mdi-home"
                      title="Dashboard"
                      value="Dashboard"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      prepend-icon="mdi-chart-box"
                      title="Relatório"
                      value="relatorio"
                      to="/dashboard/relatorio"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      to="/dashboard/midia"
                      prepend-icon="mdi-image"
                      title="Mídia/banners"
                      value="midia"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      to="/dashboard/registros"
                      title="Registros"
                      prepend-icon="mdi-account-plus"
                      value="Registros"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      title="Carteira"
                      prepend-icon="mdi-wallet-bifold"
                      to="/dashboard/carteira"
                      value="carteira"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      title="Nível e progresso"
                      to="/dashboard/nivel"
                      prepend-icon="mdi-medal"
                      :disabled="true"
                      value="nivel"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      title="Links de divulgação"
                      to="/dashboard/divulgacao"
                      prepend-icon="mdi-account"
                      value="conta"
                    ></v-list-item>
                    <v-list-item
                      rounded="xl"
                      color="primary"
                      title="Área de membros"
                      :variant="!rail ? 'outlined' : ''"
                      :disabled="true"
                      prepend-icon="mdi-account-school"
                      value="area"
                    ></v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item :value="1">
            <v-container fluid>
              <v-row> </v-row>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { profileStore } from "~/store/profile";

const { mdAndUp } = useDisplay();
const avatarSize = computed(() => (rail.value ? 30 : 60));
const dialog = ref(false);
const drawer = ref(mdAndUp.value);
const rail = ref(false);
const profile = profileStore();
const planName = ref(null)
watch(
  () => mdAndUp.value,
  (newValue) => {
    drawer.value = newValue;
  }
);
const tab = ref(1);
const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "R$ 0,00";
  }
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const logout = async () => {
  try {
    const cookie = useCookie("token");
    cookie.value = null;
    profile.setAuth(false)
    return navigateTo("/");
  } catch (error) {
    console.error(error);
  }
};

const planFetch = async () => {
  if (profile.affiliate_plan != null) {
    const planId = profile.affiliate_plan.plan_id;
    const planNames = {
      1: 'Apenas CPA',
      2: 'Apenas RevShare',
      3: 'CPA+Revshare' 
    };

    planName.value = planNames[planId] || 'Plano desconhecido'
  }
};

planFetch()
</script>

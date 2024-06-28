import { profileStore } from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const storedProfile = profileStore();

  if (storedProfile.auth) {
    const cookie = useCookie("token");
    const token = cookie.value;

    try {
      const data = await $fetch("https://api.grilo7.bet/affiliate_config", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (data) {
        storedProfile.setAffiliatePlan(data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar configuração de afiliação:', error);
    }
  }
});

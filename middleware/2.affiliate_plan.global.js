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

      // Verifique se o array 'data' está vazio
      if (Array.isArray(data) && data.length === 0) {
        storedProfile.setAffiliatePlan(false); // ou qualquer valor padrão desejado
      } else {
        storedProfile.setAffiliatePlan(data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar configuração de afiliação:', error);
    }
  }
});

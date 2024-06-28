import { profileStore } from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;
  const profile = profileStore();

  try {
      const data = await $fetch("https://api.grilo7.bet/update", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        profile.setAuth(true);
        profile.setId(data.id)
        profile.setNome(data.name);
        profile.setSaldo(data.wallet);
        profile.setPhone(data.phone);
        profile.setCode(data.code);
      }

  } catch (error) {
    //
  }
});

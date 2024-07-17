import { profileStore } from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("token");
  const token = cookie.value;
  const profile = profileStore();

  try {
    if (profile.auth){
      const data = await $fetch("https://api.grilo7.bet/api/data/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if (data) {
      profile.setAuth(true);
      profile.setId(data?.userData?.id)
      profile.setNome(data?.userData?.name);
      profile.setSaldo(data?.userData?.wallet);
      profile.setAvatar(data?.userData?.avatar);
      profile.setPhone(data?.personalData?.phone);
      profile.setCode(data?.userData?.code);
      profile.setAffiliatePlan(data?.planId?.planId);
    }
  }

  } catch (error) {
  //
}
});

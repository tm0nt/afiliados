import { profileStore } from "~/store/profile";

export default defineNuxtRouteMiddleware((to, from) => {
  const storedProfile = profileStore();
  if (storedProfile.auth) {
    return navigateTo("/dashboard/");
  }
});

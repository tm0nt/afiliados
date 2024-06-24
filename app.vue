<template>
  <div>
    <NuxtPwaAssets />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { profileStore } from "~/store/profile";

const cookie = useCookie("token");
const token = cookie.value;
const profile = profileStore();

const fetchData = async () => {
  try {
    const data = await $fetch("https://api.grilo7.bet/update", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(data){
      console.log(data)
      profile.setAuth(true)
      profile.setNome(data.name)
      profile.setSaldo(data.wallet)
      profile.setPhone(data.phone)
      profile.setCode(data.code)

    }
  } catch (error) {
    console.error(error);
  }
};

fetchData();



</script>

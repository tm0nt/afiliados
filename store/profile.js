import { defineStore } from "pinia";

export const profileStore = defineStore("profile", {
  state: () => ({
    id: null,
    nome: null,
    saldo: null,
    auth: false,
    phone: null,
    code: null,
    affiliate_plan: false,
    avatar: null,
  }),
  actions: {
    setId(id) {
      this.id = id;
    },
    setNome(nome) {
      this.nome = nome;
    },
    setSaldo(saldo) {
      this.saldo = saldo;
    },
    setAuth(auth) {
      this.auth = auth;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setCode(code) {
      this.code = code;
    },
    setAvatar(avatar) {
      this.avatar = avatar;
    },
    setAffiliatePlan(affiliate_plan) {
      this.affiliate_plan = affiliate_plan;
    },
  },
});

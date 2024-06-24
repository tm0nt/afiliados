import { defineStore } from "pinia";

export const profileStore = defineStore("profile", {
  state: () => ({
    nome: null,
    saldo: null,
    auth: false,
    phone: null,
    code: null
  }),
  actions: {
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
  },
});

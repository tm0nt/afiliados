import type { DefaultsInstance } from "vuetify";

/**
 * A few defaults that I like
 */
export const defaults: DefaultsInstance = {
  VAppBar: {
    elevation: 0,
  },
  VBtn: {
    variant: "flat",
    height: 50,
    rounded: "xl",
    size: "small",
  },
  VTextField: {
    color: "primary",
    variant: "solo",
    bgColor: "#303030",
    rounded: "xl",
    density: "comfortable",
  },
};

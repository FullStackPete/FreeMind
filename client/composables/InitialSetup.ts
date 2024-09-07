import type { InitialSetupType } from "~/types";

export const initialSetup = reactive<InitialSetupType>({
  name: "",
  wallpaper: "",
  setupComplete: false,
});

export type ThemeElements = {
  name: string;
  properties: {
    name: string;
    value: string;
  }[];
};

export type InitialSetupType = {
  name: string;
  wallpaper: string;
  setupStep: 0 | 1 | 2 | 3;
};

import { getContrast } from "./getContrast";
import { lightenDarkenColor } from "./lightenDarkenColor";
import type { ThemeElements } from "~/types";

const styleDocument = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

export const updateTheme = (classesToChange: ThemeElements[]) => {
  classesToChange.forEach((element) => {
    element.properties.forEach((prop) => {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(prop.value)) {
        styleDocument(prop.name, prop.value);
      } else {
        console.log("Invalid color code!!");
      }
    });
  });
};
export const classesToChange = (
  primaryColor: string,
  toolbarColor: string
) => {
  return [
    {
      name: "primary-color",
      properties: [
        { name: "--my-primary-color", value: primaryColor },
        {
          name: "--my-primary-contrast-color",
          value: getContrast(primaryColor),
        },
        {
          name: "--my-primary-hover-color",
          value: lightenDarkenColor(primaryColor, 19),
        },
        {
          name: "--my-primary-active-color",
          value: lightenDarkenColor(primaryColor, -21),
        },
      ],
    },
    {
      name: "toolbar",
      properties: [{ name: "--my-toolbar-background", value: toolbarColor }],
    },
  ];
};

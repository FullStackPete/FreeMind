import { getTextColor } from "./getTextColor";
import { lightenDarkenColor } from "./lightenDarkenColor";
import type { ThemeElements } from "~/types";
import invert from "invert-color";

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
export const classesToChange = (primaryColor: string) => {
  const toolbarColor =
    getTextColor(primaryColor) === "#000000"
      ? lightenDarkenColor(primaryColor, -20)
      : lightenDarkenColor(primaryColor, 20);

  const invertedPrimary = invert(primaryColor);
  return [
    {
      name: "primary-color",
      properties: [
        { name: "--my-primary-color", value: primaryColor },
        {
          name: "--my-primary-contrast-color",
          value: getTextColor(primaryColor),
        },
        {
          name: "--my-primary-hover-color",
          value: lightenDarkenColor(primaryColor, 20),
        },
        {
          name: "--my-primary-active-color",
          value: lightenDarkenColor(primaryColor, -20),
        },
        {
          name: "--my-primary-text-color",
          value: getTextColor(primaryColor),
        },
      ],
    },
    {
      name: "contrast",
      properties: [
        {
          name: "--my-button-contrast-background",
          value: invertedPrimary,
        },
        {
          name: "--my-button-contrast-color",
          value: getTextColor(invertedPrimary),
        },
        {
          name: "--my-button-contrast-border-color",
          value: invertedPrimary,
        },
        {
          name: "--my-button-contrast-hover-border-color",
          value: lightenDarkenColor(invertedPrimary, 20),
        },
        {
          name: "--my-button-contrast-hover-background",
          value: lightenDarkenColor(invertedPrimary, 20),
        },
        {
          name: "--my-button-contrast-hover-color",
          value: getTextColor(invertedPrimary),
        },
        {
          name: "--my-button-contrast-active-border-color",
          value: lightenDarkenColor(invertedPrimary, -20),
        },
        {
          name: "--my-button-contrast-active-background",
          value: lightenDarkenColor(invertedPrimary, -20),
        },
        {
          name: "--my-button-contrast-active-color",
          value: getTextColor(invertedPrimary),
        },
      ],
    },
    {
      name: "toolbar",
      properties: [
        { name: "--my-toolbar-background", value: toolbarColor },
        {
          name: "--my-button-text-plain-active-background",
          value: lightenDarkenColor(
            toolbarColor,
            getTextColor(toolbarColor) === "#000000" ? 40 : -40
          ),
        },
        {
          name: "--my-button-text-plain-color",
          value: getTextColor(toolbarColor),
        },
        {
          name: "--my-button-text-plain-hover-background",
          value: lightenDarkenColor(
            toolbarColor,
            getTextColor(toolbarColor) === "#000000" ? 20 : -20
          ),
        },
        {
          name: "--my-toolbar-border-color",
          value: lightenDarkenColor(
            toolbarColor,
            getTextColor(toolbarColor) === "#000000" ? 20 : -20
          ),
        },
      ],
    },
  ];
};

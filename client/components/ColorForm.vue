<script setup lang="ts">
import invert from "invert-color";
import { extractColors } from "extract-colors";
import { classesToChange, updateTheme } from "~/helpers/updateTheme";
import type { FinalColor } from "extract-colors/lib/types/Color";
import { ref, computed } from "vue";

defineProps<{ hidden: boolean }>();
const filePath = ref<string>(""); // Store the data URL of the selected image
const colors = ref<FinalColor[] | void>([]);
const options = {
  pixels: 1000,
  distance: 0.22,
  colorValidator: (red: any, green: any, blue: any, alpha = 255) => alpha > 250,
  saturationDistance: 0.1,
  lightnessDistance: 0.2,
  hueDistance: 0.083333333,
};

// Computed property to first sort by area and then sort top 10 colors by lightness
const sortedTopColors = computed(() => {
  if (!colors.value) return [];

  // Sort colors by area in descending order and take the top 10
  const topColorsByArea = [...colors.value]
    .sort((a, b) => b.area - a.area)
    .slice(0, 5); // Take the top 10 colors

  // Sort the top 10 colors by lightness in ascending order (darkest to lightest)
  return topColorsByArea;
});

const handleImgChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    filePath.value = reader.result as string; // Set the data URL to the filePath

    // Extract colors from the image file path
    const getColors = async () => {
      console.log("Extracting colors...");
      colors.value = await extractColors(filePath.value, options)
        .then()
        .catch(console.error);
      console.log(colors);
      const classesToUpdateTheme = classesToChange(
        sortedTopColors.value[1].hex,
        sortedTopColors.value[1].hex
      );
      updateTheme(classesToUpdateTheme);
    };
    getColors();
  };

  reader.readAsDataURL(file); // Read the file as a data URL
};

const invertColorsFromArray = (colors: FinalColor[]): string[] => {
  let invertedColorArr: string[] = [];
  colors.forEach((color) => {
    invertedColorArr.push(invert(color.hex));
  });
  return invertedColorArr;
};
</script>
<template>
  <img
    v-if="filePath"
    :src="filePath"
    alt="Selected image"
    class="h-screen w-full object-cover fixed -z-10"
  />
  <div class="pt-[70vh]" v-if="hidden">
    <label for="file-upload">Input your image file:</label>
    <input id="file-upload" type="file" @change="handleImgChange" />

    <div>
      <p>Top 10 Extracted Colors (sorted by lightness):</p>
      <div class="flex flex-row gap-4">
        <div
          class="flex flex-col gap-y-2"
          v-if="sortedTopColors && sortedTopColors.length !== 0"
          v-for="color in sortedTopColors"
          :key="color.hex"
        >
          <div
            :style="{ backgroundColor: color.hex }"
            class="w-20 h-20 rounded border border-gray-300"
          ></div>
          <p>Intensity: {{ (color.intensity * 100).toFixed(2) }}%</p>
          <p>Area: {{ (color.area * 100).toFixed(2) }}%</p>
        </div>
      </div>
      <p class="text-lg font-semibold">Inverted Colors:</p>
      <div class="flex flex-row gap-4">
        <div
          v-if="sortedTopColors && sortedTopColors.length !== 0"
          v-for="hex in invertColorsFromArray(sortedTopColors)"
          :key="hex"
          :style="{ backgroundColor: hex }"
          class="w-20 h-20 rounded border border-gray-300"
        ></div>
      </div>
    </div>
    <div>
      <p class="text-8xl">Hello World</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { extractColors } from "extract-colors";
import { classesToChange, updateTheme } from "~/helpers/updateTheme";
import type { FinalColor } from "extract-colors/lib/types/Color";
import { ref, computed } from "vue";
import type { FileUploadSelectEvent } from "primevue/fileupload";

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

const handleImgChange = (e: FileUploadSelectEvent) => {
  console.log(e);
  const file = e.files[0];

  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    console.log("Loading");
    filePath.value = reader.result as string; // Set the data URL to the filePath

    // Extract colors from the image file path
    const getColors = async () => {
      console.log("Extracting colors...");
      colors.value = await extractColors(filePath.value, options)
        .then()
        .catch(console.error);
      console.log(colors);
      const classesToUpdateTheme = classesToChange(
        sortedTopColors.value[1].hex
      );
      updateTheme(classesToUpdateTheme);
    };
    getColors();
  };

  reader.readAsDataURL(file); // Read the file as a data URL
};
</script>
<template>
  <div class="border-2 border-gray-200 p-4 rounded-lg">
    <img
      v-if="filePath"
      :src="filePath"
      alt="Selected image"
      class="h-screen w-full object-cover fixed -z-10"
    />
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >If you want to experience all the great benefits of FreeMind please
      upload initial set of wallpapers</span
    >
    <p class="mb-2 text-surface-500 dark:text-surface-400 block">
      Choose up to 5 wallpapers
    </p>

    <FileUpload
      ref="fileupload"
      mode="basic"
      name="demo[]"
      accept="image/*"
      :maxFileSize="20000000"
      :auto="true"
      @select="handleImgChange"
    />
  </div>
</template>

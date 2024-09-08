<script setup lang="ts">
import { initialSetup } from "#imports";
const classess = ref<{ objectName: string; class: string }[]>([
  { objectName: "welcomeText", class: "-translate-y-[70vh] scale-50" },
  {
    objectName: "wallpaperUploadDialog",
    class: "scale-50 translate-y-[70vh]",
  },
]);

const smoothClassChange = (
  position: string,
  classIndex: number,
  time: number
) => {
  setTimeout(() => {
    classess.value[classIndex].class = position;
  }, time);
};

onMounted(() => {
  smoothClassChange("translate-y-0 scale-75", 0, 500);
  smoothClassChange("-translate-y-[10vh] scale-100", 0, 1000);
  smoothClassChange("scale-100", 1, 700);
  smoothClassChange("translate-y-[5vh] scale-100", 1, 1200);

});
</script>

<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <p
      class="font-bold transition-all duration-500 text-7xl text-center"
      :class="classess[0].class"
    >
      Hello {{ initialSetup.name }}!
    </p>
    <WallpaperDialog class="transition-transform duration-500" :class="classess[1].class" />
  </div>
</template>

<script setup lang="ts">
import { initialSetup } from "#imports";
</script>

<template>
  <div>
    <NameInput v-if="initialSetup.setupStep === 0" />
    <WallpaperInput v-if="initialSetup.setupStep === 1"  />
  </div>
</template>

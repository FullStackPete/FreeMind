<script lang="ts" setup>
import { initialSetup } from "#imports";
</script>
<template>
  <div>
    <WelcomeSetup v-if="initialSetup.setupStep!==3" />
  </div>
</template>

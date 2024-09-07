<script lang="ts" setup>
import { initialSetup } from "#imports";
</script>
<template>
  <div>
    <WelcomeForm v-if="initialSetup.setupComplete===false" />
    <ColorForm :hidden="initialSetup.setupComplete" />
  </div>
</template>

<script lang="ts" setup>
import { initialSetup } from '~/composables/InitialSetup';
</script>
<template>
    <Navbar v-if="initialSetup.setupStep===3" />
    <slot />
</template>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Product details</h2>
    <p>Product ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>

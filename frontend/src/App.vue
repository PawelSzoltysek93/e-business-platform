<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow px-6 py-4">
      <h1 class="text-xl font-bold">E-Business Platform</h1>
    </header>

    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

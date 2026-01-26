<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Products</h2>

    <div v-if="loading">Loading...</div>

    <ul v-else class="space-y-2">
      <li
        v-for="product in products"
        :key="product._id"
        class="bg-white p-4 rounded shadow"
      >
        <h3 class="font-bold">{{ product.name }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchProducts } from "../api/products.api";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetchProducts();
    products.value = res.data.data;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <form
  class="bg-white p-4 rounded shadow mb-6 space-y-4"
  @submit.prevent="handleSubmit"
>
  <h3 class="text-lg font-semibold">Add product</h3>

  <input
    v-model="form.name"
    type="text"
    placeholder="Name"
    class="w-full border px-3 py-2 rounded"
  />
  <label class="block font-medium">Price</label>
  <input
    v-model.number="form.price"
    type="number"
    placeholder="Price"
    class="w-full border px-3 py-2 rounded"
  />

  <label class="block font-medium">Stock</label>
  <input
    v-model.number="form.stock"
    type="number"
    placeholder="Stock"
    class="w-full border px-3 py-2 rounded"
  />

  <label class="block font-medium">Tags</label>
  <input
    v-model="form.tags"
    type="text"
    placeholder="Tags (comma separated)"
    class="w-full border px-3 py-2 rounded"
  />
  <label class="block font-medium">Description</label>
  <textarea
    v-model="form.description"
    placeholder="Description"
    class="w-full border px-3 py-2 rounded"
  ></textarea>
  <button
    type="submit"
    class="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Create
  </button>
</form>

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
        <p>Tags: {{ product.tags.join(", ") }}</p>
        <p v-if="product.description">Description: {{ product.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { fetchProducts, createProduct } from "../api/products.api";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);
const loading = ref(false);

const form = reactive({
  name: "",
  price: 0,
  stock: 0,
  tags: "",
  description: "",
});

const handleSubmit = async () => {
    loading.value = true;

  try {
    await createProduct({
      name: form.name,
      price: form.price,
      stock: form.stock,
      tags: form.tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      description: form.description || undefined,
    });

    const res = await fetchProducts();
    products.value = res.data.data;

    form.name = "";
    form.price = 0;
    form.stock = 0;
    form.tags = "";
    form.description = "";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const res = await fetchProducts();
    products.value = res.data.data;
  } finally {
    loading.value = false;
  }
});
</script>

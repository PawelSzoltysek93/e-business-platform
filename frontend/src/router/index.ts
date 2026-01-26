import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/Products.vue";
import ProductDetails from "../pages/ProductDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/products",
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/products/:id",
      name: "product-details",
      component: ProductDetails,
      props: true,
    },
  ],
});

export default router;

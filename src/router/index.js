import { createRouter, createWebHistory } from 'vue-router'
import Catalogue from "@/views/Catalogue.vue";
import ProductDetails from "@/components/ProductDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalogue',
      component: Catalogue
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetails,
    }

  ]
})

export default router

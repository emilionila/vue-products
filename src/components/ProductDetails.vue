<template>
<h1 class="h1">productDetails</h1>
  <div class="product">
    <div class="product-image">
      <img
          :src="selectedProduct.thumbnail"
          :alt="selectedProduct.title"
      >
    </div>

    <div class="product-details">
      <h2 class="product-title">{{selectedProduct.title}}</h2>
      <p class="product-brand">Barnd:{{selectedProduct.brand}}</p>
      <p class="product-description">Description: {{selectedProduct.description}}</p>
      <p class="product-category">Category: {{selectedProduct.category}}</p>
      <p class="product-rating">Rating: {{selectedProduct.rating}}</p>
      <p class="product-price">Price: {{selectedProduct.price}}$</p>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: 'ProductDetails'
})
</script>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";
import {productsStore} from "@/stores/products.js";

const store = productsStore();
const route = useRoute();

const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id))
})
</script>

<style>

</style>

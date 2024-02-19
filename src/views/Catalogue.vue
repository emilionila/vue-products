<template>
  <h1 class="h1">Catalogue</h1>
  <form class="form">
    <input
        type="text"
        name="search"
        placeholder="start typing"
        class="search"
        v-model="searchTerm"
        @input="handleSearchChange"
    >
    <select
        id="exampleSelect"
        name="exampleSelect"
        class="select"
    >
      <option
          value="rating"
      >
        Sort by rating
      </option>
      <option
          value="title"
      >
        Sort by title
      </option>
    </select>
  </form>

  <div class="products-list">
    <div
        class="product"
        v-for="product in filteredProducts"
        :key="product.id"
        @click="goToProductPage(product.id)"
    >
      <img
          :src="product.thumbnail"
          :alt="product.name"
          class="product-img"
      >
      <h3 class="product-title">{{product.title}}</h3>
      <p class="product-brand">Brand: {{ product.brand }}</p>
      <p class="product-description">Description: {{ product.description }}</p>
      <p class="product-price">Price: ${{ product.price}}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent} from "vue";
export default defineComponent({
  name: 'CatalogueView'
})
</script>

<script setup>
  import {onMounted, ref, watch} from "vue";
  import { productsStore } from "@/stores/products";
  import { useRouter} from "vue-router";

  const store = productsStore();
  const router = useRouter();

  const searchTerm = ref("");
  const filteredProducts = ref([]);


  onMounted(async () => {
    await logProducts();
  });
  const logProducts = async () => {
    await store.fetchProductsFromDB();
    updateFilteredProducts();
    console.log('mount>>>>>>>>>>>>');
  };

  const updateFilteredProducts = () => {
    filteredProducts.value = store.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  };

  const handleSearchChange = () => {
    updateFilteredProducts();
  };

  watch(searchTerm, handleSearchChange);

  const goToProductPage = (id) => {
    router.push({name: 'ProductView', params: { id }})
  }

</script>


<style scoped>
.h1 {
  padding: 24px 0;
}

.form {
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 18px;
  align-items: center;
  margin-bottom: 12px;
}

.select, .search {
  padding: 12px;
  border-radius: 3px;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 10px;
}

.product {
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  padding: 8px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 12px;
}

.product-title, .product-brand, .product-description, .product-price {
  margin-bottom: 8px;
}

.product-price {
  font-weight: 700;
}
</style>

<template>
  <div class="home">
    <div>
      Search for your favorite Rick & Morty character:
      <form v-on:submit.prevent="fetchData">
        <input
          v-model="query"
          type="text"
          id="search"
          name="search"
          placeholder="search.."
          required
        /><br />
      </form>
    </div>
    <div class="container">
      <InfoCard v-for="result in results" :key="result.id" :info="result" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InfoCard from "../components/InfoCard.vue";

export default Vue.extend({
  name: "Home",

  data() {
    return {
      url: "https://rickandmortyapi.com/api/character/?name=",
      query: "",
      results: [],
    };
  },
  methods: {
    fetchData() {
      fetch(this.url + this.query)
        .then(stream => stream.json())
        .then(data => (this.results = data.results))
        .catch(error => console.error(error));
      this.query = "";
    },
  },
  components: { InfoCard },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
input {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  width: 330px;
}
</style>

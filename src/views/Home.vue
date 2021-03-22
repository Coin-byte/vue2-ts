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
      <InfoCard v-for="result in allResults" :key="result.id" :info="result" />
    </div>
  </div>
</template>

<script lang="ts">
import { RickMorty } from "@/types";
import Vue from "vue";
import InfoCard from "../components/InfoCard.vue";

export default Vue.extend({
  name: "Home",

  data() {
    return {
      query: "",
    };
  },
  methods: {
    fetchData() {
      this.$store.dispatch("ACTION_SEARCH", this.query.toLowerCase());
      this.query = "";
    },
  },
  computed: {
    allResults(): RickMorty[] {
      return this.$store.getters.currentResult;
    }
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

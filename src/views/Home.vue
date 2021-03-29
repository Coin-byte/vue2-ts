<template>
  <div class="home">
    <div class="main">
      <div class="form">
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
        <InfoCard
          v-for="result in allResults"
          :key="result.id"
          :info="result"
        />
      </div>
    </div>
    <div class="searchHistory">
      <ul>
        <li v-for="(item, index) in history" :key="index">
          <h3 v-on:click="fetchHistory(item)">{{ item }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { RickMorty, SearchResult } from "@/types";
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
      
      const query = this.query.trim().toLowerCase()
      if (query === undefined || query.length < 1) {
        return;
      }
      this.$store.dispatch("ACTION_SEARCH", query);
      this.query = "";
    },
    fetchHistory(foo: string) {
      this.$store.dispatch("ACTION_SEARCH", foo);
    }
  },
  computed: {
    allResults(): RickMorty[] {
      return this.$store.getters.currentResult;
    },
    history(): string[] {
      return this.$store.getters.searchHistory;
    },
  },
  components: { InfoCard },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
}

.main {
  max-width: calc(100%-250px);
  width: 1200px;
}
.searchHistory {
  width: 500px;
  margin-top: 80px;
}
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

li {
  list-style-type: none;
  width: 200px;
  display: block;
  border: 2px solid black;
  margin: 5px;
}
li:hover{
  background: black;
  color: white;
  cursor: pointer;
}

</style>

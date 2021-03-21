<template>
  <div class="card">
    <div>
      <img :src="info.image" alt="Avatar" />
    </div>
    <div class="info">
      <h3>{{ info.name }}</h3>
      <div>
        <p v-bind:class="info.status">{{ info.status }}</p>
        <h6>{{ info.location.name }}</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "InfoCard",
  props: {
    info: {},
  },
});
</script>

<style scoped>
.card {
  display: flex;
  background: #f1f1f1;
  max-width: 400px;
  min-width: 400px;
  max-height: 205px;
  border-radius: 100px 55px 55px 100px;
  margin: 20px;
}
img {
  justify-content: flex-start;
  border: 2px solid black;
  border-radius: 100px;
  height: 200px;
  width: 200px;
}
.Alive {
  color: Green;
}

.Dead {
  color: red;
}
.info {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>

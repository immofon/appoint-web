<template>
  <div id="app"  v-loading="loading">
    <router-view/>
  </div>
</template>
<script>
import rpc from "@/api/rpc.js";
export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    setInterval(() => {
      this.loading = !rpc.connected();
    }, 300);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

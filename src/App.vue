<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.eleToken) {
      const decoded = JSON.parse(localStorage.eleToken);
      this.$store.dispatch("setAuthentiated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="app-outer fill-body" id="app">
    <NavigationTopbar />
    <main class="app-content fill-body">  
       <router-view></router-view>
    </main>
    <NavigationFooter id="footer" />
  </div>
</template>

<script>
import NavigationTopbar from "./components/NavigationTopbar.vue";
import NavigationFooter from "./components/NavigationFooter.vue";
export default {
  name: "app",
  components: {
    NavigationTopbar,
    NavigationFooter
  },

  data() {
    return {};
  }
};
</script>

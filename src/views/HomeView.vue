<template>
  <div class="home">
    <TemplateComponent />
    <Demo />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Demo from "@components/Demo/Demo";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Demo,
  },
};
</script>

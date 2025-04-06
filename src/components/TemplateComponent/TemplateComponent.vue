<!--
 * @Author: Flandy
 * @Date: 2025-04-05 11:15:53
 * @Description: 模版组件
-->
<template>
  <div class="TemplateComponent" @click="increment">
    {{ msg }}
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const msg = ref("你等着");
onMounted(() => {
  setTimeout(() => {
    msg.value = "我变强了";
  }, 2000);
});
</script>

<style scoped lang="less">
@import "./TemplateComponent.less";
</style>

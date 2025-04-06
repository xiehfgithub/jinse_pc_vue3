<!--
 * @Author: Flandy
 * @Date: 2025-04-05 11:15:53
 * @Description: 模版组件
-->
<template>
  <div class="Demo" @click="increment">
    {{ count_get }}
    <br />
    <span style="font-size: 20px" @click="getNet">Get请求结果: {{ Gdata }}</span>
    <br />
    <br />
    {{ count_post }}
    <br />
    <span style="font-size: 20px" @click="postNet">Post请求结果: {{ Pdata }}</span>
  </div>

  <div class="usefetch fetch-box" @click="getNetReal">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">请求出错：{{ error.message }}</div>
    <div v-else>
      <h2>{{ user.name?.title }} {{ user.name?.first }} {{ user.name.last }}</h2>
      <img :src="user.picture.large" alt="用户头像" />
      <p>📧 {{ user.email }}</p>
      <p>📍 {{ user.location.country }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const count_get = ref(0);
const count_post = ref(0);

// Get
const Gdata = ref({ content: "默认值" });
const getNet = async () => {
  await axios({
    method: "get",
    url: "/api/init",
    data: {},
  }).then((res) => {
    console.log(res.data);
    Gdata.value = res.data;
    console.log("成功", Gdata.value);
  });

  count_get.value++;
};
// Post
const Pdata = ref({ content: "默认值" });
const postNet = async () => {
  await axios
    .post("/api/back", {
      FETime: Date.now(),
      resKey1: "请求参数1",
      resKey2: "请求参数2",
    })
    .then((res) => {
      console.log(res.data);
      Pdata.value = res.data;
      console.log("成功", Pdata.value);
    });
  count_post.value++;
};
// vueuse
import { useFetch } from "@vueuse/core";

const user = ref(null);
const loading = ref(true);
const error = ref(null);
const getNetReal = async () => {
  const { isFetching, error: fetchError, data } = await useFetch("https://randomuser.me/api").json();
  loading.value = isFetching.value;
  error.value = fetchError.value;
  /* if (error.value) {
    console.error("请求错误:", error.value);
    return;
  } */
  const res = data.value ?? {};
  user.value = res?.results?.[0];
};

onMounted(async () => {
  getNetReal();
});
</script>

<style scoped lang="less">
@import "./Demo.less";
.fetch-box {
  width: 50%;
  margin: 10px auto;
  border: 1px dashed red;
  &:hover {
    cursor: pointer;
    background-color: aquamarine;
  }
}
</style>

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Mock
if (process.env.NODE_ENV === "development") {
  // 仅开发环境启用 mock
  require("@/mock/mock.js");
}

createApp(App).use(store).use(router).mount("#app");

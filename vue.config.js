const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./", // 👈 设置资源路径为相对路径
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "./src/assets/less/common.less"),
      ],
    },
  },
  // 去掉文件名中的 hash
  filenameHashing: false,
  // 保存时eslint-loader检查
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "@public": path.resolve("public"),
        "@assets": path.resolve("src/assets"),
        "@components": path.resolve("src/components"),
      },
    },
  },
  devServer: {
    port: 8080, // 本地运行端口
    open: true, // 启动时自动打开浏览器
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },

});

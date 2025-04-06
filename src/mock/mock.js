import Mock from "mockjs";
// const Random = Mock.Random;
// console.log(Random.integer(10, 10000));

Mock.setup({
  timeout: "400-600",
});


Mock.mock(
  "/api/init",
  "get",
  {
    "success": true,
    "message": "jinse mock api",
    "data": {
      "content": "demo kv",
    },
  },
);
Mock.mock(
  "/api/back",
  "post",
  (options) => {
    const body = JSON.parse(options.body);
    return {
      "success": true,
      "message": "jinse mock api",
      "data": {
        BEKey: "后台字段",
        BETime: Date.now(),
        ...body,
      },
    };
  },
);

console.log("Mock Start!", Mock);

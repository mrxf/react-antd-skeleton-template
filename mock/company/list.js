const Mock = require("mockjs");

/** 公司列表 */
module.exports = Mock.mock({
  total: "@natural(20,40)",
  "list|8-10": [
    {
      id: "@id",
      companyName: "@cword(4,6)",
    },
  ],
});

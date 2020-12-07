const Mock = require("mockjs");

/** 游戏列表 */
module.exports = Mock.mock({
  total: "@natural(20,40)",
  "list|6-10": [
    {
      id: "@id",
      title: "@cword(4,8)",
      company: "@cword(4,6)",
      publicTime: "@datetime",
      "type|1": ['FIGHT', 'PVP', 'MOBA', 'RPG'],
    },
  ],
});

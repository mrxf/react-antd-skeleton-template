const Mock = require("mockjs");

/** 用户信息 */
module.exports = Mock.mock({
  data: {
    usrId: "@id",
    email: "@email",
    company: "@cword(4,6)"
  },
});

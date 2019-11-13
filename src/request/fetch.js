const url = require("./url.js");
const service = require("./service.js").service;

function LoginFn(data) {
  return service({
    url: url.LOGINAPI,
    data: data
  });
}

// 请求首页的数据
function HomeFn(data) {
  return service({
    url: url.HOMEAPI,
    data: data
  });
}

module.exports = {
  LoginFn: LoginFn,
  HomeFn: HomeFn
};

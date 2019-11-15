const url = require("./url.js");
const server = require("./server.js");
// 登录
function fetchLogin(data) {
  return server({
    url: url.login,
    data: data,
    method: "get"
  });
}
// 手机
function mobilefetch(data) {
  return server({
    url: url.mobile,
    data: data,
    method: "post"
  });
}
// 新人红包
function newfetch(data) {
  return server({
    url: url.newRedpacket,
    data: data,
    method: "post"
  });
}
// 四个红包
function fourfetch(data) {
  return server({
    url: url.fourRedpacket,
    data: data
  });
}
// 打开红包
function openfetch(id, data) {
  return server({
    url: url.openRedpacket + "/" + id,
    data: data,
    method: "put"
  });
}
// 全部余额
function allBfetch(data, id) {
  return server({
    url: url.allBalance,
    data: data
  });
}
// 邀请好友
function profetch(data) {
  return server({
    url: url.promotion,
    data: data,
    method: "post"
  });
}
// 排行榜
function listfetch(id, data) {
  return server({
    url: url.rankingList + "/" + id,
    data: data
  });
}
// 天天领红包第一次点
function newDayfetch(data) {
  return server({
    url: url.newDayRedp,
    data: data,
    method: "post"
  });
}
// 助力记录
function hisfetch(data) {
  return server({
    url: url.hisUrl,
    data: data
  });
}
// 跑马灯
function lampfetch(data) {
  return server({
    url: url.lampUrl,
    data: data
  });
}
// 判断是否领取过一次红包
function isGetfetch(id, data) {
  return server({
    url: url.isGet + "/" + id,
    data: data
  });
}

module.exports = {
  fetchLogin: fetchLogin,
  mobilefetch: mobilefetch,
  newfetch: newfetch,
  fourfetch: fourfetch,
  openfetch: openfetch,
  allBfetch: allBfetch,
  profetch: profetch,
  listfetch: listfetch,
  newDayfetch: newDayfetch,
  hisfetch: hisfetch,
  lampfetch: lampfetch,
  isGetfetch: isGetfetch
};

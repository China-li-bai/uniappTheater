const url = require("./url.js");
function getToken() {
  var _this = this;
  wx.login({
    success: function(res) {
      console.log(res);
      if (res.code) {
        wx.request({
          url: url.login,
          data: { code: res.code, company_app_key: "qwrdsjhgfgcf$*#" },
          header: {},
          method: "post",
          success: function(res) {
            console.log(res);
            var result = res.data;
            if (res.statusCode === 200) {
              wx.setStorageSync("token", result.token);
            } else {
              wx.showToast({
                title: "请求失败",
                icon: "none",
                duration: 1500,
                mask: true,
                success: function(res) {},
                fail: function(res) {}
              });
            }
          },
          fail: function(res) {},
          complete: function(res) {}
        });
      }
    },
    fail: function(res) {},
    complete: function(res) {}
  });
}
module.exports = {
  login: getToken
};

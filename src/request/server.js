const login = require("./login.js").login;
function server(option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: option.url,
      data: option.data,
      method: option.method || "GET",
      header: {
        // Authorization: wx.getStorageSync("token"),
        "content-type":
          option.method === "POST"
            ? "application/x-www-form-urlencoded"
            : "application/json" // 默认值
      },
      dataType: option.dataType || "json",
      responseType: "text",
      success: function(res) {
        if (res.statusCode == 401) {
          login();
        } else {
          resolve(res);
        }
      },
      fail: function(res) {
        reject(res);
        login();
        wx.showToast({
          title: res.data.msg || "请求失败",
          icon: "none",
          image: "",
          duration: 1500,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {}
        });
      },
      complete: function(res) {}
    });
  });
}
module.exports = server;

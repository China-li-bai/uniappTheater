function fetch(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data,
      header: options.header || {
        "content-type": "application/json"
      },
      method: options.method || "GET", // POST
      success: function(res) {
        // 服务器返回错误信息
        if (res.data.code !== 0) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
            mask: true
          });
        }
        resolve(res.data);
      },
      fail: function(res) {
        reject(res);
      }
    });
  });
}

module.exports = {
  service: service
};

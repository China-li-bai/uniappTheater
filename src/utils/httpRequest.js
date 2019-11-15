/**
 * 域名
 */
// let server = "https://ssl.arkcloudcorp.com/aircinema/"; //新开发域名
let server = "https://ssl.9jcloud.com/cinema/"; //正式域名
// let server = 'https://ssl.arkcloudcorp.com/cinema/'

/**
 * 测试专用sessionId
 */
let sessId = "";

/**
 * onStart 开始请求,初始加载loading等处理
 */
function onStart() {
  wx.showLoading({
    title: "正在加载"
  });
}

/**
 * onEnd 结束请求，结束加载loading等处理
 */
function onEnd() {
  wx.hideLoading();
}

/**
 * 请求失败
 */
function fail() {
  wx.showToast({
    title: "请求失败",
    icon: "none",
    duration: 3000
  });
}

/**
 * 请求404
 */
function fourZeroFour() {
  wx.showToast({
    title: "页面找不到404",
    icon: "none",
    duration: 3000
  });
}

/**
 * get
 */
function GET(url, params, session, popCinema) {
  sessId = wx.getStorageSync("sessionId");
  if (!params) {
    params = {};
  }
  if (!session) {
    params.sessionId = sessId;
  }
  if (popCinema) {
    console.log("true-----------删除cinema");
    server = server.replace("cinema/", "");
  } else {
    server = server.replace("cinema/", "") + "cinema/";
  }
  let promise = new Promise(function(resolve, reject) {
    onStart(); //loading start
    wx.request({
      url: server + url,
      data: params,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      /**
       * 成功回调
       */
      success: function(res) {
        if (res.data) {
          /** start 根据需求 接口的返回状态码进行处理 */
          if (res.data.code === 0) {
            resolve(res.data);
            onEnd(); //loading end
          } else {
            console.log("success错误：", res);
            resolve(res.data);
            onEnd(); //loading end
            if (res.statusCode === 404) {
              fourZeroFour();
            }
          }
        }
      },
      /**
       * 失败回调
       */
      fail: function(error) {
        onEnd(); //loading end
        fail();
        console.log("fail失败", error);
      },
      /**
       * 结束回调（不管成功或者失败都执行）
       */
      complete: function(res) {
        onEnd(); //loading end
      }
    });
  });
  return promise;
}
/**
 * post
 */
function POST(url, params, session, type) {
  console.log("dddd", type, server);
  sessId = wx.getStorageSync("sessionId");
  if (!params) {
    params = {};
  }
  if (!session) {
    params.sessionId = sessId;
  }
  let promise = new Promise(function(resolve, reject) {
    // onStart(); //loading start
    if (server.indexOf("cinema") == -1) {
      server = server + "cinema/";
    }
    wx.request({
      url: server + url,
      data: params,
      method: "POST",
      header: {
        "content-type": type ? type : "application/json"
      },
      success: function(res) {
        onStart(); //loading start
        if (res.data) {
          /** start 根据需求 接口的返回状态码进行处理 */
          if (res.data.code === 0) {
            resolve(res.data);
            // onEnd(); //loading end
          } else {
            resolve(res.data);
            console.log("错误：", res);
            onEnd(); //loading end
            if (res.statusCode === 404) {
              fourZeroFour();
            }
          }
        }
      },
      /**
       * 失败回调
       */
      fail: function(error) {
        onEnd(); //loading end
        fail();
        console.log("fail失败", error);
      },
      /**
       * 结束回调（不管成功或者失败都执行）
       */
      complete: function(res) {
        onEnd(); //loading end
      }
    });
  });
  return promise;
}

module.exports = {
  $post: POST,
  $get: GET
};

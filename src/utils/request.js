/** 请求函数 */

const baseUrl = "https://ssl.arkcloudcorp.com/aircinema"; //测试环境
// export const baseUrl = "https://ssl.9jcloud.com/aircinema"; //正式环境
console.log("当前环境", baseUrl);
/**
 * 错误处理函数
 * @param content 提示内容
 * @param code 错误code
 */
function handleError(content, code) {
  wx.showToast({
    title: content,
    icon: "none",
    duration: 4000
  });
  // 此处跳转到登录页
}

/**
 * 请求方法
 * @param options 请求方法配置 
  @param url: string  接口地址
  @param method?:| 'OPTIONS'| 'GET' | 'HEAD' | 'POST' | 'PUT'| 'DELETE'| 'TRACE'| 'CONNECT'| undefined 请求类型 
  @param data?: Object  提交的数据 
  @param proxy?: boolean 是否需要代理，如果代理，则url自带主机域名，不会用baseUrl进行拼接 
  是否免处理错误
  @param Toast?: boolean 是否需要toast错误提示
  @param Loading: boolean 是否需要loading与遮罩mask
  @param type: 'application/x-www-form-urlencoded' 默认x-www-form-urlencoded
  @param Authorization 是否需要带token 默认需要
 */
const app = getApp();
function request(options) {
  const token = wx.getStorageSync("tk");
  console.log("toke", token);
  const _url = options.proxy ? options.url : baseUrl + "/" + options.url;
  const _header = {
    Authorization: options.token ? options.token : token,
    "content-type": options.type ? options.type : "application/json"
  };
  if (options.Authorization === false) {
    delete _header.Authorization;
  }
  return new Promise((resolve, reject) => {
    if (options.Loading) {
      wx.showLoading({ title: "loading...", mask: true });
    }
    console.log("请求参数", options.data, _header, _url);
    wx.request({
      url: _url,
      method: options.method ? options.method : "GET",
      data: options.data,
      header: _header,
      success(respone) {
        wx.hideLoading();
        const res = respone.data;
        if (options.Toast) {
          if (res.code === 0) {
            resolve(res);
          } else {
            handleError(res.msg, res.code);
            reject(false);
          }
        } else {
          if (res.code === 0) {
            resolve(res);
          } else {
            reject(false);
          }
        }
      },
      fail(e) {
        wx.hideLoading();
        wx.showToast({
          title: "网络错误",
          icon: "none"
        });
        reject("网络错误");
      }
    });
  });
}
module.exports = request;

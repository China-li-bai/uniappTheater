<template>
  <!-- 微信授权页 -->
  <view class="flex column center" style="height:100%;">
    <view class="title">空中影院</view>
    <view class="text"
      >欢迎来到空中影院小程序！现在登录即可体验完美的会员观影快感~
    </view>
    <button
      class="button flex center"
      open-type="getUserInfo"
      hover-class="hoverClass"
      @getuserinfo="onGotUserInfo"
    >
      <image src="../../images/20190819114622.png" class="img"></image>
      <text class="smallTitle">微信授权登录</text>
    </button>
    <!-- <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">手机号获取</button> -->
  </view>
</template>

<script>
// pages/empower/empower.js
// 引入request
const Http = require("../../utils/httpRequest.js");
const fetchLogin = require("../../request/fetch").fetchLogin;
export default {
  data() {
    return {
      code: "" //code顾名思义就是微信登陆的code啦
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  methods: {
    // 获取手机号
    // getPhoneNumber(e) {
    //     Http.$get(`issuer/getUserPhone`, {
    //         encryptedData: e.detail.encryptedData,
    //         iv: e.detail.iv,
    //         code: this.data.code
    //     })
    // },
    // 微信授权
    onGotUserInfo(e) {
      let that = this;

      if (e.detail.errMsg.split(":")[1] !== "fail auth deny") {
        let encryptedData = e.detail.encryptedData;
        let iv = e.detail.iv; // 授权

        wx.login({
          success(res) {
            let code = res.code;
            that.setData({
              code: code
            });
            setTimeout(() => {
              // 先登录站长
              Http.$get("issuer/login", {
                code: code
              }).then(res => {
                if (res.code === 0) {
                  //存sessionId到本地
                  wx.setStorageSync("sessionId", res.data.sessionId); // 发请求获取用户信息

                  Http.$get("issuer/decodeUserInfo", {
                    encryptedData: encryptedData,
                    iv: iv,
                    code: code
                  }).then(res => {
                    if (res.code === 0) {
                      wx.showToast({
                        title: "登录授权成功！",
                        icon: "seccuss",
                        duration: 3000
                      });
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 1
                        });
                      }, 1000);
                    } else {
                      wx.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 3000
                      });
                    }
                  });
                } else {
                  console.log(res, "站长登录失败");
                  wx.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                  });
                }
              });
            }, 500);
          }
        });
      } else {
        // 不授权
        console.log("你取消授权了");
      }
    },

    setData: function(obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function(key) {
        keys = key.split(".");
        val = obj[key];
        data = that.$data;
        keys.forEach(function(key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
page {
  width: 100%;
  height: 100%;
}
.title {
  margin-bottom: 60rpx;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 137, 209, 1);
}

.text {
  width: 548rpx;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.button {
  width: 550rpx;
  height: 77rpx;
  margin-top: 100rpx;
  background: rgba(0, 137, 209, 1);
  border-radius: 10rpx;
}

.img {
  width: 52rpx;
  height: 40rpx;
}

.smallTitle {
  display: inline-block;
  width: 200rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 254, 254, 1);
}

.hoverClass {
  background-color: #9c9c9c;
}
</style>

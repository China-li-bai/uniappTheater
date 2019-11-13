<template>
  <div>
    <view class="authorize">
      <open-data type="userAvatarUrl" class="header-avatar"></open-data>
      <view class="content"
        >该校程序由九九久云开发，请提供一下授权，即可继续操作</view
      >
      <view class="desc">- 获取你的公开信息（昵称、头像等）</view>

      <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
        确认授权
      </button>
    </view>
  </div>
</template>

<script>
export default {
  name: "MovieAuthorize",
  data() {
    return {
      userInfo: {},
      isAuth: null
    };
  },
  methods: {
    // 获取token
    getToken(user) {
      const _this = this;

      // 1.调用uni.login获取code
      uni.login({
        success: function(res) {
          console.log(res);
          // 2.把code传给后端换取token
          uni.request({
            url: "https://ssl.9jcloud.com/cinema/issuer/login?code=" + res.code,

            success: function(res) {
              console.log(res);
              const result = res.data;
              if (result.code === 0) {
                // 3.把后端返回的token缓存到本地
                try {
                  uni.setStorageSync("token", result.data.token);
                } catch (e) {
                  console.log(e);
                }

                _this.userInfo = user.userInfo;
                _this.isAuth = true;
              } else {
                uni.showToast({
                  title: result.msg || "请求失败",
                  icon: "none",
                  duration: 2000,
                  mask: true
                });
              }
              uni.hideLoading();
            },
            fail: function(res) {
              console.log(res);
              uni.hideLoading();
            }
          });
        },
        fail: function(res) {
          uni.hideLoading();
        }
      });
    },
    getUserInfo(event) {
      console.log(event);
      if (event.detail.errMsg === "getUserInfo:ok") {
        // 点击允许之后的操作
        uni.showLoading({
          title: "加载中"
        });
        this.getToken(event.detail);
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const _this = this;

    uni.showLoading({
      title: "加载中"
    });
    //1. 检查用户是否授权过
    uni.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 检查session-key
          uni.checkSession({
            success: function(res) {
              // session-key没过期
              uni.getUserInfo({
                success(user) {
                  console.log(user);
                  if (uni.getStorageSync("token")) {
                    _this.userInfo = user.userInfo;
                    _this.isAuth = true;

                    uni.hideLoading();
                  } else {
                    // token不存在，直接调用uni.login获取code发给后端换取token回来
                    _this.getToken(user);
                  }
                }
              });
            },
            fail: function(res) {
              // session-key过期,但已经授权过，要重新走登录流程
              uni.getUserInfo({
                success(user) {
                  _this.getToken(user);
                }
              });
            }
          });
        } else {
          // 啥都不做，直接显示个授权按钮

          _this.isAuth = false;

          uni.hideLoading();
        }
      }
    });
  }
};
</script>

<style scoped>
page {
  width: 100%;
  height: 100%;
}
.authorize {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #eaebea;
  padding: 0 60rpx;
  overflow: hidden;
}

.header-avatar {
  display: block;
  margin: 100rpx auto 50rpx;
  width: 200rpx;
  height: 200rpx;
  overflow: hidden;
  border-radius: 50%;
}
.content {
  padding-top: 40rpx;
  border-top: 1rpx solid #ccc;
  font-size: 28rpx;
  color: #4e4e4e;
}
.desc {
  padding: 20rpx 0 80rpx;
  color: #9d9d9d;
  font-size: 26rpx;
}
.btn {
  width: 100%;
  height: 90rpx;
  font-size: 36rpx;
  color: #fff;
  background-color: #ff6802;
}
</style>

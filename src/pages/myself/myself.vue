<template>
  <!-- <skeleton
  loading="{{ skeletonSelectedLoadingType }}"
  bgcolor="{{ skeletonBgcolor }}"
  isDev="{{ skeletonIsDev }}"
  data="{{ skeletonData }}"
  wx:if="{{ !pageIsReady || skeletonIsDev }}"
></skeleton> -->

  <view class="container skeleton">
    <view class="headBox" @tap="register">
      <view class="h_msg">
        <!-- <image class="skeleton-rect" :src="portrait"></image>
        <view class="userName skeleton-rect">{{ title }}</view> -->
        <open-data class="header-avatar" type="userAvatarUrl"></open-data>
        <open-data class="userName" type="userNickName"></open-data>
      </view>
    </view>

    <view class="listBox">
      <view class="l_list div_float skeleton-rect" @tap="toPersonal">
        <view class="iconBox">
          <text class="lineBox personIcon"></text>
        </view>
        <view class="til">个人信息</view>
        <view class="arrow">
          更多
          <text class="lineBox arrow_r"></text>
        </view>
      </view>
      <view class="l_list div_float skeleton-rect" @tap="toMyMovie">
        <view class="iconBox">
          <text class="lineBox movieIcon"></text>
        </view>
        <view class="til">我的影片</view>
        <view class="arrow">
          更多
          <text class="lineBox arrow_r"></text>
        </view>
      </view>
      <view class="l_list div_float skeleton-rect" @tap="toMyEarning">
        <view class="iconBox">
          更多
          <text class="lineBox earningsIcon"></text>
        </view>
        <view class="til">我的分成</view>
        <view class="arrow">
          更多
          <text class="lineBox arrow_r"></text>
        </view>
      </view>
      <view class="l_list div_float skeleton-rect" @tap="toMyExports">
        <view class="iconBox">
          <text class="lineBox exportsIcon"></text>
        </view>
        <view class="til">我的提现</view>
        <view class="arrow">
          更多
          <text class="lineBox arrow_r"></text>
        </view>
      </view>
      <view class="l_list div_float skeleton-rect" @tap="toOI">
        <view class="iconBox">
          <text class="lineBox remarkIcon"></text>
        </view>
        <view class="til">操作说明</view>
        <view class="arrow">
          更多
          <text class="lineBox arrow_r"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//index.js
//获取应用实例
// 引入request
// const Http = require("../../utils/httpRequest.js"); // const skeletonData = require('./skeletonData');

export default {
  data() {
    return {
      //   skeletonData: skeletonData,
      title: "",
      //名字
      portrait: "",
      //头像
      after: false //是否有更新用户信息
    };
  },

  components: {},
  props: {},
  onLoad: function() {
    // getApp().globalData.page.skeletonInitial(this);
    // setTimeout(() => {
    //   getApp().globalData.page.closeSkeleton(this);
    // }, 400);
  },
  onShow: function() {
    if (!this.after) {
      this.getJudgePower(); //进来判断是否授权
    }
  },
  methods: {
    // 进来判断是否授权
    getJudgePower() {
      if (!wx.getStorageSync("sessionId")) {
        this.setData({
          title: "请登录",
          portrait: "../../images/headImg.png"
        });
      } // 判断是否有登陆去决定是否拿用户信息

      if (wx.getStorageSync("sessionId")) {
        Http.$get(`issuer/personalInfo`).then(res => {
          if (res.code === 0) {
            this.setData({
              title: res.data.nick,
              portrait: res.data.portrait,
              after: true
            });
            wx.setStorageSync("person", res.data);
            wx.setStorageSync("phone", res.data.mobile);
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 3000
            });
            wx.clearStorage();

            if (!wx.getStorageSync("sessionId")) {
              this.setData({
                title: "请登录",
                portrait: "../../images/headImg.png"
              });
            }
          }
        });
      }
    },

    //点击头像是否授权
    register() {
      if (!wx.getStorageSync("sessionId")) {
        wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
    },

    //跳转个人信息
    toPersonal() {
      // 判断是否已授权或登陆——————授权或登陆了，走第一条———————没授权或登陆，走第二条
      if (wx.getStorageSync("sessionId")) {
        // 个人信息需要用到手机号，先检查有没有手机号，没有？-----跑第二条
        if (wx.getStorageSync("phone")) {
          wx.navigateTo({
            url: "../../pages/personMsg/personMsg"
          });
        } else {
          wx.navigateTo({
            url: "../../pages/myPhone/myPhone"
          });
        }
      } else {
        wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
    },

    // 跳转我的影片
    toMyMovie() {
      // 判断是否已授权或登陆——————授权或登陆了，走第一条———————没授权或登陆，走第二条
      if (wx.getStorageSync("sessionId")) {
        wx.navigateTo({
          url: "../../pages/myMovie/myMovie"
        });
      } else {
        wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
    },

    // 我的分成
    toMyEarning() {
      // 判断是否已授权或登陆——————授权或登陆了，走第一条———————没授权或登陆，走第二条
      if (wx.getStorageSync("sessionId")) {
        wx.navigateTo({
          url: "../../pages/myEarning/myEarning"
        });
      } else {
        wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
    },

    //我的提现
    toMyExports() {
      // 判断是否已授权或登陆——————授权或登陆了，走第一条———————没授权或登陆，走第二条
      if (wx.getStorageSync("sessionId")) {
        wx.navigateTo({
          url: "../../pages/myExports/myExports"
        });
      } else {
        wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
    },

    // 跳转操作说明
    toOI() {
      wx.navigateTo({
        url: "../../pages/OI/OI"
      });
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
@import "./myself.css";
</style>

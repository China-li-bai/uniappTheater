<template>
<!-- 微信授权页 -->
<view class="flex column center" style="height:100%;">
    <!-- <view class="title">空中影院</view> -->
    <view class="text">
        您体验的该部分功能，需要获取您的手机号，为了有更好的体验效果，请您点击按钮进行确定。
    </view>
    <button class="button flex center" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" hover-class="hoverClass">
        <image src="../../images/phone.png" class="img"></image>
        <text class="smallTitle">获取手机号</text>
    </button>
</view>
</template>

<script>
// pages/myPhone/myPhone.js
// 引入request
const Http = require("../../utils/httpRequest.js");

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    // 获取手机号
    getPhoneNumber(e) {
      console.log(wx.getStorageSync('person').code);
      Http.$get(`issuer/getUserPhone`, {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        code: wx.getStorageSync('person').code
      }).then(res => {
        if (res.code === 0) {
          wx.setStorageSync('phone', res.data.phoneNumber);
          wx.showToast({
            title: res.msg,
            icon: 'success',
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
            icon: 'none',
            duration: 3000
          });
        }
      });
    },

    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
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
@import "./myPhone.css";
</style>
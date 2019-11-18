<template>
<view class="container">
    <view>
        <view class="otherList div_float">
            <view class="til">银行账号</view>
            <view class="inputBox">
                <input class="lineBox" type="number" :value="brankNum" @blur="changeBrankNum" placeholder="请输入您的银行账号" placeholder-class="placeClass"></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">银行账号类型</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="brankType" @blur="changeBrankType" @input="regInput" data-name="brankType" placeholder="请输入您的银行账号类型" placeholder-class="placeClass"></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">开户名称</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="brankName" @blur="changeBrankName" @input="regInput" data-name="brankName" placeholder="请输入您的银行开户名称" placeholder-class="placeClass"></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">开户人</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="userName" @blur="changeUserName" @input="regInput" data-name="userName" placeholder="请输入您的真实姓名" placeholder-class="placeClass"></input>
            </view>
        </view>
    </view>
    <button class="addBankCard" hover-class="hoverClass" @tap="addBankCard">
        <text>确定添加银行卡</text>
    </button>

</view>
</template>

<script>
// pages/addBankCard/addBankCard.js
// 引入request
const Http = require("../../utils/httpRequest.js");

export default {
  data() {
    return {
      brankNum: '',
      //银行卡号
      brankType: '',
      //银行卡类型
      brankName: '',
      //开户名称
      userName: '' //开户人
      ,
      inputName: ""
    };
  },

  components: {},
  props: {},
  methods: {
    //输入银行卡号
    changeBrankNum(ele) {
      this.setData({
        brankNum: ele.detail.value
      });
    },

    //输入银行卡类型
    changeBrankType(ele) {
      this.setData({
        brankType: ele.detail.value
      });
    },

    //输入开户名称
    changeBrankName(ele) {
      this.setData({
        brankName: ele.detail.value
      });
    },

    //输入开户人
    changeUserName(ele) {
      this.setData({
        userName: ele.detail.value
      });
    },

    // 跳转添加银行卡
    addBankCard() {
      // console.log(this.data.brankNum, this.data.brankType, this.data.brankName, this.data.userName)
      if (this.brankNum !== '' && this.brankType !== '' && this.brankName !== '' && this.userName !== '') {
        Http.$post('issuer/addBankCard', {
          account: this.brankNum,
          type: this.brankType,
          aName: this.userName,
          bName: this.brankName
        }).then(res => {
          if (res.code === 0) {
            this.updataPerson();
            wx.showToast({
              title: '添加成功！',
              icon: 'seccuss',
              duration: 3000
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 3000
            });
          }
        });
      } else {
        wx.showToast({
          title: '请填完整信息！',
          icon: 'none',
          duration: 3000
        });
      }
    },

    // 发请求更新个人信息
    updataPerson() {
      Http.$get(`issuer/personalInfo`).then(res => {
        if (res.code === 0) {
          wx.setStorageSync('person', res.data);
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          });
        }
      });
    },

    // 输入中文验证
    regInput(e) {
      console.log(e);
      let inputName = e.currentTarget.dataset.name;
      let val = e.detail.value;
      this.setData({
        [inputName]: getApp().globalData.reg.regChina(val)
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
@import "./addBankCard.css";
</style>
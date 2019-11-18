<template>
<view class="container">
    <view>
        <view class="imgList div_float">
            <view class="til">头像</view>
            <view class="r_box">
                <image :src="portrait"></image>
                <!-- <text class="lineBox arrow_r"></text> -->
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">昵称</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="nickName" @blur="changeNickName" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">手机号码</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="phoneNum" @blur="changePhone" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">银行账号</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="brankNum" @blur="changeBrankNum" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">银行账号类型</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="brankType" @blur="changeBrankType" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">开户名称</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="brankName" @blur="changeBrankName" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
        <view class="otherList div_float">
            <view class="til">开户人</view>
            <view class="inputBox">
                <input class="lineBox" type="text" :value="userName" @blur="changeUserName" placeholder-class="placeClass" disabled></input>
            </view>
        </view>
    </view>
    <button class="addBankCard" hover-class="hoverClass" @tap="toAddBankCard">
        <image src="../../images/add.png"></image>
        <text>添加银行卡</text> 
    </button>

</view>
</template>

<script>
import utils from "../../utils/util";
const util = utils.utils.prototype;

export default {
  data() {
    return {
      portrait: '',
      //头像
      nickName: '',
      //昵称
      phoneNum: '',
      //手机号码
      brankNum: '',
      //银行卡号
      brankType: '',
      //银行卡类型
      brankName: '',
      //开户名称
      userName: '' //开户人

    };
  },

  components: {},
  props: {},
  onLoad: function () {// wx.checkSession({
    //     success(e) {
    //         //session_key 未过期，并且在本生命周期一直有效
    //         console.log('有效', e)
    //     },
    //     fail(e) {
    //         // session_key 已经失效，需要重新执行登录流程
    //         console.log('sss', e)
    //         wx.login() //重新登录
    //     }
    // })
  },
  onShow: function () {
    this.getStorag();
  },
  methods: {
    // 从本地拿个人信息
    getStorag() {
      this.setData({
        nickName: wx.getStorageSync('person').nick,
        phoneNum: wx.getStorageSync('phone'),
        portrait: wx.getStorageSync('person').portrait
      }); // 处理没有添加银行卡时的报错

      if (wx.getStorageSync('person').banks != undefined) {
        this.setData({
          brankNum: wx.getStorageSync('person').banks[0].account,
          brankType: wx.getStorageSync('person').banks[0].type,
          brankName: wx.getStorageSync('person').banks[0].bname,
          userName: wx.getStorageSync('person').banks[0].aname
        });
      }
    },

    // 跳转添加银行卡
    toAddBankCard() {
      wx.navigateTo({
        url: '../../pages/addBankCard/addBankCard'
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
@import "./personMsg.css";
</style>
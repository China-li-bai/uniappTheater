<template>
<form @submit="formSubmit">
    <view class="container">
        <view>
            <!-- 顶部 -->
            <view class="headBox">
                <view class="hint">可提现金额：
                    <text>{{tatbw}}</text>元</view>
                <view class="inputBox div_float">
                    <text class="priceIcon">¥</text>
                    <view class="i_input">
                        <input type="digit" name="input" maxlength="10" placeholder="请输入提现金额" placeholder-class="placeClass" :value="all" @input="inputedit"></input>
                    </view>
                    <text class="allExport" @tap="allMoney">全部提现</text>
                </view>
                <view class="nextHint">下次提现时间{{nextTime}}</view>
            </view>

            <view class="brankMsgBox">
                <view class="b_list div_float">
                    <view class="l">银行账号</view>
                    <view class="r">
                        <input type="number" placeholder-class="brankPlace" :value="account" disabled></input>
                    </view>
                </view>
                <view class="b_list div_float">
                    <view class="l">银行账号类型</view>
                    <view class="r">
                        <input type="text" placeholder-class="brankPlace" :value="type" disabled></input>
                    </view>
                </view>
                <view class="b_list div_float">
                    <view class="l">开户名称</view>
                    <view class="r">
                        <input type="text" placeholder-class="brankPlace" :value="bank" disabled></input>
                    </view>
                </view>
                <view class="b_list div_float">
                    <view class="l">开户人</view>
                    <view class="r">
                        <input type="text" placeholder-class="brankPlace" :value="name" disabled></input>
                    </view>
                </view>
            </view>

        </view>
        <button class="exportBtn" hover-class="hoverClass" form-type="submit">确认提现</button>
    </view>
</form>
</template>

<script>
// 引入request
const Http = require("../../utils/httpRequest.js");

export default {
  data() {
    return {
      account: '',
      //银行卡号
      name: '',
      //开户人
      bankId: '',
      //银行标识
      bank: '',
      //银行名字
      type: '',
      //银行类型
      tatbw: '',
      //可提现总额
      nextTime: '',
      //下次提现时间
      all: '',
      //输入框的金额
      currentTime: '' //当前时间

    };
  },

  components: {},
  props: {},
  onShow: function () {
    this.getBankCardData();
  },
  methods: {
    // 确定提现
    formSubmit(e) {
      if (Number(e.detail.value.input) <= 0) {
        wx.showToast({
          title: '提现金额必须大于0',
          icon: 'none',
          duration: 3000
        });
        return;
      }

      Http.$get(`issuer/withdraw`, {
        money: e.detail.value.input,
        bankId: this.bankId
      }).then(res => {
        if (res.code === 0) {
          console.log('成功', res);
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 3000
          });
          setTimeout(() => {
            this.getBankCardData();
          }, 500);
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          });
          console.log('失败', res);
        }
      });
    },

    //   获取银行卡信息
    getBankCardData() {
      Http.$get(`issuer/bankInfo`).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.setData({
            name: res.data.aname,
            account: res.data.account,
            bankId: res.data.bankId,
            bank: res.data.bname,
            type: res.data.type,
            tatbw: res.data.tatbw,
            nextTime: res.data.nextTime.split(' ')[0].replace(/-/g, "/")
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          });
        }
      });
    },

    // 全部提现
    allMoney() {
      this.setData({
        all: this.tatbw
      });
    },

    inputedit(e) {
      let that = this;
      this.setData({
        all: that.money(e.detail.value) //money匹配金额输入规则，返回输入值

      });
    },

    // 输入验证
    money(val) {
      let num = val.toString(); //先转换成字符串类型

      if (num.indexOf('.') == 0) {
        //第一位就是 .
        num = '0' + num;
      }

      num = num.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符

      num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

      num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数

      if (num.indexOf(".") < 0 && num != "") {
        num = parseFloat(num);
      }

      return num;
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
@import "./exportDeposit.css";
</style>
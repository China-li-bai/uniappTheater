<template>
<view class="container">

  <rich-text class="domView lineBox" :nodes="htmlData"></rich-text>  

</view>
</template>

<script>

export default {
  data() {
    return {
      htmlData: `<div style='font-sie:28rpx;color:#333333;line-height: 100rpx;'>
              按票价的百分比分成，比如：比如票10元一张每
              张票站长分成10%的话，那站长能得到1元以此类推
              按票价的百分比分成，比如：比如票10元一张每张票
              站长分成10%的话，那站长能得到1元。以此类推。</div>`
    };
  },

  components: {},
  props: {},
  onLoad: function () {},
  methods: {
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
@import "./OI.css";
</style>
<template>
<view class="container">
  
  <!-- 搜索框 -->
  <view class="searchBox">
    <view class="lineBox seaIcon"></view>
    <input class="seaInput" type="text" :value="seaText" placeholder="搜索关键词" confirm-type="search" placeholder-class="searchHolder" @confirm="searchFun" @input="inputSearch"></input>
  </view>

</view>
</template>

<script>

export default {
  data() {
    return {
      seaText: '' //搜索文本

    };
  },

  components: {},
  props: {
    seaText: {
      // 属性名
      type: String,
      value: ''
    }
  },
  onLoad: function () {},
  methods: {
    //点击搜索
    searchFun() {
      this.$emit('search-method', this.seaText);
    },

    //监听输入搜索值
    inputSearch(ele) {
      this.setData({
        seaText: ele.detail.value
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
@import "./searchCom.css";
</style>
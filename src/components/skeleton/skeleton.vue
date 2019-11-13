<template>
<view>
<!--<canvas canvas-id="skeleton" disable-scroll="true"></canvas>-->
<view :style="'background-color: ' + bgcolor || '#FFF' + '; ' + ( isDev ? devData.container : data.container )" :class="'skeleton skeleton_' + loading" v-if="!isDev || isShowByDev">
  <block v-for="(list, type) in isDev ? devData.lists : data.lists" :key="type">
    <view v-for="(item, index) in list.elements" :key="index" :class="'skeleton__item skeleton__item_' + list.type" :style="item"></view>
  </block>
  <view class="skeleton__spinbox">
    <view class="skeleton__spin"></view>
  </view>
  <view class="skeleton__shine"></view>
</view>
<skeleton-btn v-if="isDev" :selector="selector" :isShow="isShowByDev" :selectorTypes="selectorTypes" @updateData="handleUpdateData" @toggleShow="handleToggleShow"></skeleton-btn>
</view>
</template>

<script>
import skeletonBtn from "./skeleton-btn";

export default {
  data() {
    return {
      isShowByDev: false,
      devData: null,
      skeletonWidth: 375,
      skeletonHeight: 667,
      selectorTypes: ['bg', 'rect', 'circle']
    };
  },

  components: {
    skeletonBtn
  },
  props: {
    /**
     * 骨架屏数据
     */
    data: {
      type: Object,
      value: null
    },

    /**
     * 是否是开发模式，如果为true, 则显示生成按钮
     */
    isDev: {
      type: Boolean,
      value: false
    },

    /**
     * 选择器名字
     */
    selector: {
      type: String,
      value: 'skeleton'
    },

    /**
     * 骨架屏背景
     */
    bgcolor: {
      type: String,
      value: '#FFF'
    },

    /**
     * 骨架屏动画效果，可以是如下值: 'spin', 'chiaroscuro', 'shine'
     */
    loading: {
      type: String,
      value: ''
    }
  },
  methods: {
    attached() {
      // 默认的首屏宽高，防止内容闪现
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        skeletonHeight: systemInfo.windowHeight
      });
    },

    handleToggleShow(e) {
      this.setData({
        isShowByDev: e.detail
      });
    },

    handleUpdateData(e) {
      this.setData({
        devData: e.detail
      });
      console.table(e.detail);
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
@import "./skeleton.css";
</style>
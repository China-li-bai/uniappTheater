<template>
  <!-- <skeleton
  loading="{{ skeletonSelectedLoadingType }}"
  bgcolor="{{ skeletonBgcolor }}"
  isDev="{{ skeletonIsDev }}"
  data="{{ skeletonData }}"
  wx:if="{{ !pageIsReady || skeletonIsDev }}"
></skeleton> -->

  <view class="container skeleton">
    <!-- 搜索框 -->
    <search-com
      @search-method="searchFun"
      :seaText="searchValue"
      class="skeleton-rect"
    ></search-com>

    <view class="bannerView">
      <!-- 轮播图 -->
      <swiper
        class="bannerBox"
        autoplay
        circular
        previous-margin="35rpx"
        next-margin="35rpx"
        @change="bannerChange"
      >
        <block v-for="(item, idx) in wheelData" :key="idx">
          <swiper-item class="b_item" :data-id="item.filmId" @tap="toDetailOne">
            <image :src="item.shuffleImg" class="b_img skeleton-rect"></image>
          </swiper-item>
        </block>
      </swiper>
      <!-- 显示面板指示点 -->
      <view class="dotBox">
        <block v-for="(item, idx) in wheelData" :key="idx">
          <text :class="'lineBox ' + (idx == bSelIdx ? 'sel' : '')"></text>
        </block>
      </view>
    </view>

    <!-- 电影系列 -->
    <view class="recomView" v-for="(item, idx) in valueData" :key="idx">
      <view class="reTil skeleton-rect">
        <text class="lineBox line"></text>
        <text class="r_text">{{ item.labelName }}</text>
      </view>
      <scroll-view scroll-x class="reCnView">
        <block v-for="(item, idx) in item.films" :key="idx">
          <view
            class="r_list skeleton-rect"
            :data-id="item.id"
            @tap="toDetailTwo"
          >
            <view class="imgBox">
              <image :src="item.coverBill"></image>
              <text class="score">评分：{{ item.score }}</text>
            </view>
            <view class="m_til eli_one">{{ item.name }}</view>
            <view class="issBtn">发布</view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
//index.js
//获取应用实例
// 引入request
const Http = require("../../utils/httpRequest.js"); // const skeletonData = require('./skeletonData');
import searchCom from "../../components/searchCom/searchCom";

export default {
  data() {
    return {
      // skeletonData: skeletonData,
      bSelIdx: 0,
      //指示面板下标
      valueData: [],
      //首页电影系列的数据
      run: false,
      //false跑onload，true跑onshow
      id: "",
      //跳转电影详情的id
      wheelData: [], //轮播数据
      searchValue: ""
    };
  },

  components: {
    searchCom
  },
  props: {},
  // 去掉这条也是没问题的
  onLoad: function() {
    getApp().globalData.page.skeletonInitial(this);

    if (this.run == false) {
      this.getIndexData();
      this.getWheel();
      setTimeout(() => {
        this.setData({
          run: true
        });
      }, 500);
    }
  },
  onShow: function() {
    Http.$get(`films/getShuffles`).then(res => {
      this.setData({
        wheelData: res.data
      });
    }); //获取对应 站长的一部影片排期

    Http.$get(`issuer/webMasterOneFilmScenes`, {
      filmId: "16",
      sessionID: "31718412337152 "
    }).then(res => {
      console.log(res);
    });

    if (this.run == true) {
      this.getIndexData();
      this.getWheel();
    }

    this.setData({
      searchValue: ""
    });
  },
  methods: {
    //搜索
    searchFun(ele) {
      wx.navigateTo({
        url:
          "../../pages/searchResult/searchResult?value=" + JSON.stringify(ele)
      });
    },

    //轮播图改变
    bannerChange(ele) {
      this.setData({
        bSelIdx: ele.detail.current
      });
    },

    // 点击轮播跳转对应的电影
    toDetailOne(ele) {
      this.setData({
        id: ele.currentTarget.dataset.id
      });
      wx.navigateTo({
        url: "../../pages/detail/detail?id=" + this.id
      });
    },

    // 点击电影系列跳转对应的电影
    toDetailTwo(ele) {
      this.setData({
        id: ele.currentTarget.dataset.id
      });
      wx.navigateTo({
        url: "../../pages/detail/detail?id=" + this.id
      });
    },

    // 进来获取轮播图数据
    getWheel() {
      Http.$get(`films/getShuffles`).then(res => {
        this.setData({
          wheelData: res.data
        });
      }); //获取对应 站长的一部影片排期

      Http.$get(`issuer/webMasterOneFilmScenes`, {
        filmId: "16",
        sessionID: "31718412337152 "
      }).then(res => {
        console.log(res);
      });
    },

    //   进来获取首页电影系列数据
    getIndexData() {
      Http.$get(`films/getLabelFilms`).then(res => {
        if (res.code === 0) {
          console.log(res);
          this.setData({
            valueData: res.data
          });
          getApp().globalData.page.closeSkeleton(this);
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        }
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
@import "./index.css";
</style>

<template>
  <view>
    <view class="QS-tabs-box">
      <QSTabs
        ref="tabs"
        :tabs="tabs"
        fontSize="32"
        width="150"
        defaultColor="#333"
        activeColor="#46A3FF"
        animationLineWidth="30"
        :current="current"
        @change="change"
        swiperWidth="750"
      >
      </QSTabs>
    </view>
    <!-- 滑动展示区 -->
    <swiper
      :style="{ height: '1200rpx' }"
      :current="current"
      @change="swiperChange"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item
        class="swiper-item"
        v-for="(item, index) in tabs"
        :key="index"
      >
        <view>
          <!-- 搜索 -->
          <view class="search">
            <image
              src="../../static/zy-search/search.svg"
              mode="aspectFit"
              class="voice-icon"
            ></image>
            <text class="placeholder">搜索关键词</text>
          </view>
          <!-- 搜索 -->
          <!-- banner-swiper -->
          <swiper class="bannerSwiper" indicator-dots="true" autoplay="true">
            <block v-for="(item, index) in tabs" :key="index">
              <swiper-item class="bannerItem">
                <image
                  mode="aspectFit"
                  src="../../static/Banner map.png"
                ></image>
              </swiper-item>
            </block>
          </swiper>
          <!-- swiper -->

          <!-- 类别title -->
          <view class="title-url flex">
            <text class="font-32">推荐电影</text>
            <view class="font-26 flex bettew">
              <text @click="toMovieList()">
                全部1314
              </text>
              <text class="triangle"></text>
            </view>
          </view>
          <!-- title -->

          <scroll-view class="scroll-x" scroll-x="true" style="height: 402upx;">
            <view class="x-flex-row">
              <block v-for="(item, index) in tabs" :key="index">
                <view class="x-item">
                  <view class="x-img" @tap="toDetail()">
                    <image
                      mode="aspectFill"
                      src="../../static/movie2.png"
                    ></image>
                    <text class="movie-score">9.0</text>
                  </view>
                  <view class="x-title">
                    追龙
                  </view>
                  <view class="x-btn" @click="toPublish()">
                    发布
                  </view>
                </view>
              </block>
            </view>
          </scroll-view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import QSTabs from "../../components/QS-tabs/QS-tabs.vue";

const Sys = uni.getSystemInfoSync();
console.log(JSON.stringify(Sys));
const wH = Sys.windowHeight;
export default {
  components: {
    QSTabs
  },
  data() {
    return {
      tabs: ["热播", "剧情", "冒险", "动画", "青春", "校园", "科幻", "动作"],
      current: 0,
      tabsHeight: 0,
      dx: 0,
      itemData:''
    };
  },
  methods: {
    change(index) {
      this.current = index;
    },
    swiperChange({ detail: { current } }) {
      this.current = current;
      console.log(this.current);
      
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
    },
    toMovieList() {
      uni.navigateTo({
        url: "../movieList/movieList?listID=12"
      });
    },

    //跳转详情
    toDetail() {
      uni.navigateTo({
        url: "../detail/detail?movieID=1"
      });
    },
    //跳转到发布页
    toPublish() {
      uni.navigateTo({
        url: "../detail/detail"
      });
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.QS-tabs-box {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: 1upx solid #e0e0e0;
}
.swiper-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  text-align: center;
  padding: 0 30upx;
  box-sizing: border-box;
  /*background-color: #f1505c;*/
}
/* 搜索 */
.search {
  width: 100%;
  height: 72upx;
  margin: 20upx 0;
  border: 1px solid rgba(70, 163, 255, 1);
  border-radius: 36upx;
  display: flex;
  align-items: center;
  font-size: 28upx;
  color: #999;
}
.voice-icon {
  width: 36upx;
  height: 36upx;
  margin-left: 60upx;
  color: #007aff;
}
.placeholder {
  margin-left: 30upx;
}
/* 搜索 */

/* banner */
.bannerSwiper {
  width: 100%;
  height: 335upx;
  border-radius: 12upx;
  overflow: hidden;
}
.bannerItem {
  width: 100%;
  height: 100%;
  background: #bbb;
}
.bannerSwiper image {
  width: 100%;
  height: 100%;
}
/* banner */

/* <!-- title跳转 --> */
.title-url {
  width: 100%;
  height: 103upx;
  text-align: center;
  justify-content: space-between;
  color: #333;
}
.flex {
  display: flex;
  align-items: center;
}

.bettew {
  justify-content: space-between;
}
.font-32 {
  font-size: 32upx;
  font-weight: 500;
}
.font-26 {
  font-size: 26upx;
}
.triangle {
  display: block;
  width: 15upx;
  height: 15upx;
  border-top: 1px solid #333;
  border-right: 1px solid #333;
  transform: rotate(45deg);
}

/* scroll-x */
.scroll-x {
}
.x-flex-row {
  display: flex;
  flex-direction: row;
}
.x-item {
  width: 218upx;
  height: 402upx;
  padding-right: 18upx;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.x-img {
  width: 218upx;
  height: 308upx;
  border-radius: 12upx;
  overflow: hidden;
  position: relative;
}
.x-img image {
  width: 100%;
  height: 100%;
}
.movie-score {
  position: absolute;
  right: 0;
  top: 0;
  width: 45upx;
  height: 30upx;
  line-height: 30upx;
  border-radius: 12upx;
  font-size: 18upx;
  color: #fff;
  background: #ff8034;
}
.x-title {
  width: 66upx;
  height: 25upx;
  line-height: 25upx;
  font-size: 26upx;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.x-btn {
  width: 120upx;
  height: 45upx;
  line-height: 45upx;
  font-size: 26upx;
  border-radius: 23upx;
  text-align: center;
  color: #fff;
  background: rgba(70, 163, 255, 1);
}
</style>

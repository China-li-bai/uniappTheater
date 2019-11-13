<template>
  <view id="details">
    <view class="movie-detail">
      <view class="img"
        ><image mode="aspectFill" src="../../static/movie2.png"></image
      ></view>
      <view class="text">
        <view class="tit">追龙</view>
        <view class="rate height27">
          <uni-rate
            disabled="true"
            size="20"
            active-color="#FF8034"
            is-fill="false"
            max="5"
            value="4.5"
          ></uni-rate
          ><text>9</text>
        </view>
        <view class="langTime height27">中文/122分钟</view>
        <view class="types height27">中国2019/动作</view>
        <view class="types height27">下架时间：2019-11-11</view>
        <view class="price height27">￥ 5.00</view>
      </view>
    </view>
    <view class="profile">
      <view class="title">简介</view>
      <view class="profile-text">
        复仇者联盟众英雄的努力下，于灭霸无限手套事件中
        化作为灰烬的人们，重新回到了人世间，曾经消失的
        蜘蛛侠彼得帕克也回归到了普通的生活之中，数
      </view>
    </view>
    <view class="actor">
      <view class="title">演职人员</view>
      <scroll-view scroll-x="true" style="height:380upx;">
        <view class="actor-scroll">
          <block v-for="(item, index) in 5" :key="index">
            <view class="actor-item">
              <image mode="aspectFill"></image>
              <view class="actor-name">乔·沃茨</view>
              <view class="actor-name font24">导演</view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <view class="still">
      <view class="title">剧照</view>
      <scroll-view scroll-x="true" class="still-scroll" style="height:251;">
        <view class="still-wiper">
          <block v-for="(item, index) in 5" :key="index">
            <view class="still-item">
              <image mode="aspectFill"></image>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <!-- 按钮 -->
    <view class="btn">发布影片</view>
  </view>
</template>

<script>
import UniRate from "../../components/uni-rate/uni-rate";

export default {
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    console.log(option.movieID); //打印出上个页面传递的参数。
	},

  components: {
    UniRate
  },
  data() {
    return {};
  },
}
</script>

<style lang="less">
#details {
  padding: 0 30upx;
  font-size: 28upx;
  color: #333;

.height27 {
  height: 28upx;
  line-height: 28upx;
  margin-top: 30upx;
  color: #666666;
}
.movie-detail {
  width: 100%;
  height: 415upx;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.img {
  width: 250upx;
  height: 355upx;
  margin: 30upx 30upx 30upx 0;
  border-radius: 10upx;
  overflow: hidden;
  background: #2c405a;
}
.img image {
  width: 100%;
  height: 100%;
}
.text {
  flex: 1;
  height: 415upx;
  padding-top: 45upx;
  box-sizing: border-box;
}
.tit {
  font-size: 36upx;
  font-weight: 500;
  height: 35upx;
  line-height: 35upx;
}
.rate {
  display: flex;
  align-items: center;
}
/* 简介 */
.profile {
  width: 100%;
  min-height: 160upx;
}
.title {
  height: 40upx;
  line-height: 40upx;
  font-size: 36upx;
  font-weight: 500;
}
.profile-text {
  margin: 23upx 0;
  font-weight: 500;
}
.price {
  color: red;
}
/* 演职 */
.actor-scroll {
  margin-top: 20upx;
  display: flex;
  flex-direction: row;
}
.actor-item {
  width: 175upx;
  margin-right: 15upx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #b3b1b1;
}
.actor-item image {
  width: 174upx;
  height: 252upx;
  border-radius: 10px;
  overflow: hidden;
  background: pink;
}
.actor-name {
  height: 36upx;
  line-height: 36upx;
  margin-top: 12upx;
}
.font24 {
  font-size: 24upx;
  color: #666666;
}
/* 剧照 */
.still-scroll {
  margin-top: 20upx;
  margin-bottom: 115upx;
  background: #333;
}
.still-wiper {
  display: flex;
  flex-direction: row;
}
.still-item {
  height: 252upx;
  width: 420upx;
  background: #666666;
  margin-right: 15upx;
}
.btn {
  width: 100%;
  height: 90upx;
  line-height: 90upx;
  font-size: 36upx;
  font-weight: 500;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background: #46a3ff;
  color: #fff;
}
}
</style>

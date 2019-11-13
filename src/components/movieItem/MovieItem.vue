<template>
  <view class="x-item">
    <view class="x-img">
      <image mode="aspectFill" :src="src"></image>
      <text class="movie-score">{{score}}</text>
    </view>
    <view class="x-title">
      {{tit}}
    </view>
    <view class="x-btn">
     {{btnText}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    src: "",
    score: 0,
    tit: "",
    btnText: ""
  }
};
</script>

<style>
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
  text-align: center;
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

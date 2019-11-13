// 电影列表展示
<template>
  <view id="lists">
    <block v-for="(item, index) in 8" :key="index">
      <movie-item
      class="margin-top30"
      :src="src"
      :score="score"
      :tit="tit"
      :btnText="btnText"
      />
    </block>
  </view>
</template>

<script>
import MovieItem from "../../components/movieItem/MovieItem";
export default {
  onLoad(option){
    console.log(option.listID);
  },
  components: {
    MovieItem
  },
  data(){
    return{
      src: "../../static/movie2.png",
      score: 9,
      tit: "追龙",
      btnText: "发布"
    }
  }
};
</script>

<style>
#lists {
  width: 100%;
  padding: 0 30upx;
  display: flex;
  flex-wrap: wrap;
}
  .margin-top30{
    margin-top: 30upx;
  }

</style>

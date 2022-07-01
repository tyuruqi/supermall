<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabClick"
      ref="tabControlPlaceholder"
      class="tab-control"
      v-show="isTabControlShow"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabclick="tabClick"
        ref="tabControl"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";

import {debounce} from 'common/untils'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabControlShow: false,
      saveY: 0
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  //首页组件创建完成后发送网络请求获取首页数据
  created() {
      //1、请求多个数据  异步操作

     //请求首页数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mounted() {
    //1、监听item图片加载完成
    const refresh =  debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImgLoad', ()=>{
      refresh()
    })


  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  methods: {
    /**
     * 事件监听相关
     */
      //切换显示的商品类型
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlPlaceholder.currentIndex = index
    },
    //回到顶部
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,1000)    //500毫秒之内回到顶部
    },
    //是否显示backTop
    contentScroll(position){
      //判断backTop是否显示
      this.isShowBackTop = -position.y > 1000

      //决定tabControl是否吸顶
      this.isTabControlShow = (-position.y) > this.tabOffsetTop
    },
    //加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //轮播图加载完成后事件
    swiperImageLoad(){
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    /**
     * 网络请求相关
     */
    //请求首页数据
    getHomeMultidata() {
      getHomeMultidata().then(res=> {
        //当前this只想当前对象，箭头函数的this是找上一层的this，组件内created的this就是当前组件
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        //页码 加1
        this.goods[type].page += 1

        //完成了下拉加载更多，调用一下，进行下一次scroll
         this.$refs.scroll.finishPullUp()
      })
    }

  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  /*padding-top: 44px;*/
  /*position: relative;*/
}
.home-nav {
  background-color: var(--color-tint);
  color: var(--color-background);

  /*在使用浏览器原生滚动时，为了让导航跟随一起滚动做的样式*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}


.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
}
/*.content {*/
/*  overflow: hidden;*/
/*  height: calc(100% - 93px);*/
/*  margin-top: 44px;*/
/*}*/

.tab-control {
  position: relative;
  z-index: 9;
}
</style>

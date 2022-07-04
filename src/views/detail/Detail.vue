<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo[0]"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>

import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo"
import DetailBottomBar from "./childComponents/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, Goods, Shop, getRecommend} from "network/detail";

import {debounce} from "common/untils"
import {backTopMixin} from "common/mixin"

import { mapActions } from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },
  data() {
    return {
      goodsId: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [backTopMixin],
  created() {
    //保存id
    this.goodsId = this.$route.params.goodsId

    //根据id请求goods的数据
    getDetail(this.goodsId).then(res => {
      const data = res.result
      //保存顶部的轮播图片
      this.topImages = data.itemInfo.topImages
      //获取并保存商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取并保存店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取并保存商品详细信息
      this.detailInfo = data.detailInfo
      //获取并保存商品参数信息
      this.paramInfo = data.itemParams
      //获取并保存评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }
    })

    //获取详情页数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 500)

  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //判断backTop是否显示
      this.isShowBackTop = -position.y > 1000
    },
    addToCart(){
      //获取购物车需要展示的信息 添加进去
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.goodsId = this.goodsId
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>

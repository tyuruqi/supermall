<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav"><img src="~assets/img/common/collect.svg" alt="">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
  },
  methods: {
    imageLoad(){
      //发射事件
      this.$bus.$emit('itemImgLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 2px;
  width: 48%;
  text-align: center;
  font-size: 14px;
}

.goods-item img {
  width: 100%;
  height: 80%;
  border-radius: 5px;
}

.goods-item p{
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space:pre-line;
}

.goods-item .price {
  color: var(--color-high-text);
  margin-right: 5px;
}

.goods-item .cfav img {
  width: 12px;
  align-items:center
}

</style>

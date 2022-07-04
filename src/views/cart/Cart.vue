<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComponents/CartList"
import CartBottomBar from "./childComponents/CartBottomBar"

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    //第一种
    // ...mapGetters(['cartLength'])
    //第二种 key（你想要的方法名）: value（getters里的方法名）
    ...mapGetters({
      cartLength: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>

<template>
  <div class="cart-bottom-bar">
    <div class="check-all" @click="checkAll">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
      />
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="total-count">
      去结算({{totalCount}})
    </div>
  </div>
</template>

<script>

import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
  ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    totalCount(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSelectAll(){
      // return !(this.cartList.filter(item => !item.checked).length)
      return this.cartList.length === 0 ? false : !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkAll(){
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  line-height: 40px;
}
.check-all {
  display: flex;
  align-items: center;
  line-height: 40px;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.total-price {
  margin-left: 30px;
}
.total-count{
  margin-left:auto;
  padding: 0 10px;
  background-color: red;
  color: #fff;
}
</style>

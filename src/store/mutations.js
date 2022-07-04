import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  //mutations里面每个方法尽可能单一职责
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
  [ADD_TO_CART](state, payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}

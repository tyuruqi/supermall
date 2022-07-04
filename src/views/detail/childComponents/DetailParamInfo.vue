<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="params-wrap">
    <div>
      <table class="info-size"  v-for="tables in paramInfo.rule.tables">
        <tr v-for="tr in tables">
          <td v-for="td in tr">{{td}}</td>
        </tr>
      </table>
      <div>{{paramInfo.rule.disclaimer}}</div>
    </div>
    <div v-for="info in paramInfo.info.set" class="info-list-wrap flex">
      <div class="info-list-tit">{{ info.key }}</div>
      <div>{{ info.value }}</div>
    </div>
    <div class="info-img" v-if="paramInfo.info.images">
      <img :src="paramInfo.info.images[0]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.params-wrap {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.params-wrap table {
  width: 100%;
  border-collapse: collapse;
}

.params-wrap table tr {
  height: 42px;
}

.params-wrap table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-list-wrap {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, .1);
  div {
    flex: 1;
    padding: 5px;
  }
  .info-list-tit {
    color: #eb4868
  }
  img {
    width: 100%;
  }
}

</style>

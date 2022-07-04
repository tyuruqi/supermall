import {debounce} from "./untils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin= {
  mounted(){
    //监听item图片加载完成
    const refresh =  debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImgLoad', ()=>{
      refresh()
    })
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
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
  }
}

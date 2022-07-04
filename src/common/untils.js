//公共的工具
/**
 * 防抖
 * @param func
 * @param delay
 * @returns {(function(...[*]=): void)|*}
 */
export function debounce(func, delay){
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 格式化时间戳
 * @param date    //时间对象
 * @param fmt     //格式化字符串
 * @returns {*}
 */
export function formatDate(date, fmt){
  //获取年份
  //y+,一个或者多个y，y*，0个或者多个y，y?，0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    //M+正则表达式规则：获取一个或者多个M
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
//用0做补全
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

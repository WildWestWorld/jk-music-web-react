// 处理图片大小
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}
// 转化点击量
export function getCount(count) {
    if (count < 0) return;
    if (count < 10000) {
      return count;
    } else if (Math.floor(count / 10000) < 10000) {
      return Math.floor(count / 1000) / 10 + "万";
    } else {
      return Math.floor(count / 10000000) / 10 + "亿";
    }
  }
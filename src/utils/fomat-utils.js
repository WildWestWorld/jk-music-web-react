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


// 格式化时间
export function formatDuration(duration) {
  //毫秒变成秒
  duration = duration / 1000
  // 488s / 60 = 8.12
  var minute = Math.floor(duration / 60)
  // 488s % 60
  var second = Math.floor(duration) % 60

  return padLeftZero(minute) + ":" + padLeftZero(second)
}

// 12 -> 12
// 5 -> 05
// 用于添零
function padLeftZero(time) {
  time = time + ""
  return ("00" + time).slice(time.length)
}


export function getPlaySong(id){
  return `http://music.163.com/song/media/outer/url?id=${id}.mp3`
}


const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString) {
    const lyricArray = lyricString.split("\n")
    //创建一个空的数组 用来装格式化后的歌词
    const lyric = []

    for (let i = 0; i < lyricArray.length; i++) {
        if (lyricArray[i]) {
            const timeArray = parseExp.exec(lyricArray[i])
            //如果没有匹配到时间 就用continue停止单次循环
            if(!timeArray){
                continue
            }
            const minute = timeArray[1]
            const second = timeArray[2]
            const millsecond = timeArray[3].length === 3 ? parseInt(timeArray[3]) : parseInt(timeArray[3] * 10)
            const lyricTotalTimeMs = minute * 60 * 1000 + second * 1000 + millsecond
            //将原先放置时间的文字变为空
            const lyricContent = lyricArray[i].replace(parseExp,'')
            const lyricObj = {lyricTotalTimeMs,lyricContent}
            // console.log(lyricObj)
            lyric.push(lyricObj)
            // console.log(timeArray)
            // console.log(lyricTotalTimeMs)
        }
        // console.log(lyricArray[i])
    }

    return lyric;
    // for (let lyricItem of lyricArray){
    //     if(lyricItem){
    //         // console.log(lyricItem)
    //         const timeArray = parseExp.exec(lyricItem)
    //         console.log(timeArray)
    //     }
    // }
}
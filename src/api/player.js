import request from "./request";

export function getSongDetailAPI(ids){
    return request({
        url:"/song/detail",
        method:"GET",
        params:{
            ids:ids
        }
    })
}

export function getLyricDetailAPI(id){
    return request({
        url:"/lyric",
        method:"GET",
        params:{
            id:id
        }
    })
}

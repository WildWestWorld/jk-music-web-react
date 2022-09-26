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

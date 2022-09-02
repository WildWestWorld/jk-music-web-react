import request from "./request";

export function getTopBanner(){
    return request({
        url:"/banner"
    })
}


export function getHotRecommend(limit=8){
    return request({
        url:"/personalized",
        params:{
            limit:limit
        }
    })
}

export function getNewAlbums(limit=10){
    return request({
        url:"/top/album",
        params:{
            limit
        }
    })
}

export function getTopList(idx=0){
    return request({
        url:"/toplist",
        params:{
            idx:idx
        }
    })
}

export function getTopListReal(id=19723756){
    return request({
        url:"/playlist/detail",
        params:{
            id:id
        }
    })
}
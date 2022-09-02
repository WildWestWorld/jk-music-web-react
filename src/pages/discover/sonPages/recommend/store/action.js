import * as actionTypes from './constant';

import { getTopBanner } from '@/api/recommend';



const  changeTopBannerAction =(res)=>{
    return {
        type:actionTypes.CHANGE_TOP_BANNERS,
        topBanners:res.banners
     }  
        
     
}

// 为什么要返回一个函数，因为我们上面还是需要传入参数的
// 使用的时候我们会这样使用 dispatch( getTopBannerAciton())
export const getTopBannerAciton =(state)=>{
    return (dispatch) =>{
        getTopBanner().then((res)=>{
            console.log(res)
            dispatch(changeTopBannerAction(res));
        })
    }
}
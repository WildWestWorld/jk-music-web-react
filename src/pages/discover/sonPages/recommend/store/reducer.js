// 专门用于配置reducer

import * as actionTypes from './constant'


// 默认属性
const defaultState ={
    topBanners:[]
}

function recommendReducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_TOP_BANNERS:
            return {...state,topBanners:action.topBanners}
        default:
            return state;
    }
}

export default recommendReducer;



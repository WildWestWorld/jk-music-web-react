import {applyMiddleware,legacy_createStore as createStore,compose} from 'redux';
import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import recommendSlice from '../pages/discover/sonPages/recommend/store/slice';
import playBarSlice from'@/components/common/player-bar/store/slice'
import playSlice from'@/pages/player/store/slice'

import totolReducer from './reducer';

// 用于让浏览器插件redux-tools 生效
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
const store =createStore(totolReducer,composeEnhancers(applyMiddleware(thunk)))

export default store;

// 创建sotre的新方法
export const reduxStore = configureStore({
     reducer:{
        recommendSlice,
        playBarSlice,
        playSlice
     }
})


// 新的redux使用方法
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopBanner,getHotRecommend } from '@/api/recommend';
import { getNewAlbums, getTopListReal } from "../../../../../api/recommend";



export const loadData =createAsyncThunk("recommend/topBanner",async()=>{
    const res = await getTopBanner()
    return res
})


export const getHotRecommendData =createAsyncThunk("recommend/hotRecommend",async()=>{
    const res = await getHotRecommend()
    return res
})

export const getNewAlbumData =createAsyncThunk("recommend/newAlbum",async()=>{
    const res = await getNewAlbums(10)
    return res
})

 // 飙升榜单
export const getHighRankData =createAsyncThunk("recommend/rank",async()=>{
    const res = await getTopListReal(19723756)
    return res
})

export const getSRankData =createAsyncThunk("recommend/rank",async()=>{
    const res = await getTopListReal(0)
    return res
})
export const getTRankData =createAsyncThunk("recommend/rank",async()=>{
    const res = await getTopListReal(0)
    return res
})


const recommendSlice = createSlice({
    // 类似于命名空间，name值会作为action.type的前缀
    name:'recommend',
    //默认值
    initialState:{
        topBanners:[],
        hotRecommends:[],
        newAlbums:[],

        highRankPlayList:{},
        newRankPlayList:{},
        originRankPlayList:{},

    },
    // 方法  
    reducers:{
        getBannerAciton(state,action){
            console.log(state.topBanners)
            console.log(state,action)
        }
    },
    // 当函数在其他地方被调用时，我们这里的函数里面的内容也会被触发
    //  我们也会在这里定义异步方法
    // extraReducers:{
    //     [函数名](state,payload){
    //         state.list.push(1)
    //     }
    // }
    
    // 定义异步函数
    extraReducers:{
        // 异步函数成功=fulfilled
        [loadData.fulfilled](state,{payload}){
            state.topBanners=payload.banners
        },
        // 失败
        [loadData.rejected](state,err){
            console.log('banners加载失败')
            
        },
        // 加载中
        [loadData.pending](state){
        },

        // 异步函数成功=fulfilled
        [getHotRecommendData.fulfilled](state,{payload}){
            // console.log(state,payload,"热门推荐")
            state.hotRecommends=payload.result
        },
        // 失败
        [getHotRecommendData.rejected](state,err){
            console.log('加载失败')
            
        },
        // 加载中
        [getHotRecommendData.pending](state){
        },


        [getNewAlbumData.fulfilled](state,{payload}){
            console.log(payload,"最新专辑")
            state.newAlbums=payload.albums
        },
        // 失败
        [getNewAlbumData.rejected](state,err){
            console.log('加载失败')
            
        },
        // 加载中
        [getNewAlbumData.pending](state){
        },
                     
        
        [getHighRankData.fulfilled](state,{payload}){
            console.log(payload,"飙升榜")
            state.highRankPlayList=payload.playlist
        },
        // 失败
        [getHighRankData.rejected](state,err){
            console.log('加载失败')
            
        },
        // 加载中
        [getHighRankData.pending](state){
        },
    }


})




// 导出同步action函数
export const {getBannerAciton} =recommendSlice.actions

// 导出
export default recommendSlice.reducer
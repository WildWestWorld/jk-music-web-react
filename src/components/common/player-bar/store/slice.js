// 新的redux使用方法
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopBanner } from '@/api/recommend';
import { getSongDetailAPI } from '@/api/player';



export const loadData = createAsyncThunk("playBar/topBanner", async () => {
    const res = await getTopBanner()
    return res
})

export const getSongDetail = createAsyncThunk("playBar/songDetail", async(params, thunkAPI) => {

    const res = await getSongDetailAPI(params)
     
    return res;
})



const playBarSlice = createSlice({
    // 类似于命名空间，name值会作为action.type的前缀
    name: 'playBar',
    //默认值
    initialState: {
        topBanners: [],
        songDetail: [],

    },
    // 方法  
    reducers: {
        getBannerAciton(state, action) {
            console.log(state.topBanners)
            console.log(state, action)
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
    extraReducers: {
        // 异步函数成功=fulfilled
        [loadData.fulfilled](state, { payload }) {
            state.topBanners = payload.banners
        },
        // 失败
        [loadData.rejected](state, err) {
            console.log('banners加载失败')

        },
        // 加载中
        [loadData.pending](state) {
        },

        [getSongDetail.fulfilled](state, { payload }) {
            state.songDetail = payload.songs
            console.log(payload)
        },
        // 失败
        [getSongDetail.rejected](state, err) {
            console.log('banners加载失败')

        },
        // 加载中
        [getSongDetail.pending](state) {
        },




    }


})




// 导出同步action函数
export const { getBannerAciton } = playBarSlice.actions

// 导出
export default playBarSlice.reducer
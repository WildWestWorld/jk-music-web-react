// 新的redux使用方法
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSongDetailAPI } from '@/api/player';





export const getSongDetail = createAsyncThunk("playBar/songDetail", async (params, thunkAPI) => {

    const res = await getSongDetailAPI(params)

    return res;
})

export const playMusicLogical = createAsyncThunk("play/playMusicLogical", async (params, thunkAPI) => {
    // 1.根据id查找playlist中是否已经有了该歌曲
    const playList =thunkAPI.getState().playSlice.playList;
    const songIndex = playList.findIndex((item)=>{
        return item.id === params
    })
    console.log(songIndex)
    console.log(params)
    //利用thunkAPI.getState()可以访问到当前的储存的变量
    console.log(thunkAPI.getState().playSlice.playList,'playList')
    
})


const playSlice = createSlice({
    // 类似于命名空间，name值会作为action.type的前缀
    name: 'playBar',
    //默认值
    initialState: {
        topBanners: [],
        songDetail: [],
        //歌单
        playList: [],
        //当前歌曲的索引
        currentSongIndex: 0,
        //当前歌曲
        currentSong: {}
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
export const { getBannerAciton } = playSlice.actions

// 导出
export default playSlice.reducer
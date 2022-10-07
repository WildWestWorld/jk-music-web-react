// 新的redux使用方法
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSongDetailAPI } from '@/api/player';
import { getRandomNumber } from "../../../utils/math-utils";
import { getLyricDetailAPI } from "../../../api/player";
import { parseLyric } from "../../../utils/parse-lyric";





export const getSongDetail = createAsyncThunk("playBar/songDetail", async (params, thunkAPI) => {

    const res = await getSongDetailAPI(params)

    return res;
})

export const playMusicLogical = createAsyncThunk("play/playMusicLogical", async (params, thunkAPI) => {
    const id = params
    // 1.根据id查找playlist中是否已经有了该歌曲
    const playList = thunkAPI.getState().playSlice.playList;
    const songIndex = playList.findIndex((item) => {
        return item.id === params
    })
    console.log(songIndex)
    console.log(params)
    //2.判断是否找到歌曲

    //如果找到歌曲
    if (songIndex !== -1) {
        //改变当前歌曲Index的状态
        thunkAPI.dispatch(changeCurrentSongIndexState(songIndex))
        const currentSong = playList[songIndex]
        //改变当前歌曲的状态
        thunkAPI.dispatch(changeCurrentSongState(currentSong))
        //请求歌曲歌词
        console.log('歌词')
        thunkAPI.dispatch(getLyricDetail(currentSong.id))
    } else {//没有找到歌曲
        //请求歌曲数据
        getSongDetailAPI(id).then((res) => {

            const currentSong = res.songs && res.songs[0]
            //如果当前的歌曲没有值，就直接return
            if (!currentSong) {
                return
            } else {
                //将新请求到的歌曲添加到播放列表中
                console.log(playList, currentSong)
                // 浅拷贝
                // let newPlayList = [...playList] 
                //深拷贝
                let playListDeep = JSON.parse(JSON.stringify(playList))
                playListDeep.push(currentSong)
                console.log(playListDeep, 123)

                // newPlayList.push(currentSong)
                // console.log(newPlayList)
                //更新歌曲列表
                thunkAPI.dispatch(changePlayListState(playListDeep))
                //更新歌曲索引值
                // 因为我们是放到数组最后一个的，所以是playList.length - 1
                thunkAPI.dispatch(changeCurrentSongIndexState(playListDeep.length - 1))

                //改变当前歌曲的状态
                thunkAPI.dispatch(changeCurrentSongState(currentSong))

                //请求歌曲歌词
                thunkAPI.dispatch(getLyricDetail(currentSong.id))

            }

        })
    }


    //利用thunkAPI.getState()可以访问到当前的储存的变量
    //利用thunkAPi可以访问到我们编辑的方法
    console.log(thunkAPI.getState().playSlice.playList, 'playList')
    console.log(thunkAPI.dispatch(changeCurrentSongIndexState(123)), 'thunkAPI')

})

//上一首/下一首逻辑
export const changeCurrentSong = createAsyncThunk("playBar/changeCurrentSong", async (params, thunkAPI) => {
    console.log(params)
    const tag = params
    const playMusicMode = thunkAPI.getState().playSlice.playMusicMode;
    const playList = thunkAPI.getState().playSlice.playList;

    let currentSongIndex = thunkAPI.getState().playSlice.currentSongIndex;
    switch (playMusicMode) {
        case 0: //顺序播放
            currentSongIndex = currentSongIndex + tag
            if (currentSongIndex >= playList.length) {
                currentSongIndex = 0
            }

            if (currentSongIndex < 0) {
                currentSongIndex = playList.length - 1
            }
            break;
        case 1: //随机播放
            let randomIndex = getRandomNumber(playList.length)
            while (randomIndex === currentSongIndex && randomIndex >= 0) {
                randomIndex = getRandomNumber(playList.length)
                console.log(randomIndex, 'random1')
            }
            currentSongIndex = randomIndex

            break;

        case 2: //单曲循环
            break;
        default:
            currentSongIndex = currentSongIndex + tag
            if (currentSongIndex >= playList.length) {
                currentSongIndex = 0
            }

            if (currentSongIndex < 0) {
                currentSongIndex = playList.length - 1
            }
    }
    const currentSong = playList[currentSongIndex];
    console.log(currentSong)
    console.log(currentSongIndex)
    thunkAPI.dispatch(changeCurrentSongState(currentSong))
    thunkAPI.dispatch(changeCurrentSongIndexState(currentSongIndex))

    thunkAPI.dispatch(getLyricDetail(currentSong.id))

    console.log(playMusicMode)
})

// 请求歌曲数据
export const getLyricDetail = createAsyncThunk("playBar/lyricDetail", async (params, thunkAPI) => {

    const res = await getLyricDetailAPI(params)
    // console.log(res.lrc.lyric)
    const lyric = res.lrc.lyric
    const lyricList = parseLyric(lyric)

    console.log(lyricList)
    thunkAPI.dispatch(changeLyricListState(lyricList))

    return res;
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
        currentSong: {},
        playMusicMode: 0,//0：循环 1：随机 2：单曲
        lyricList: [],
        currentLyricIndex:0
    },
    // 方法  
    reducers: {
        getBannerAciton(state, action) {
            console.log(state.topBanners)
            console.log(state, action)
        },
        changeCurrentSongIndexState(state, action) {
            state.currentSongIndex = action.payload
        },
        changeCurrentSongState(state, action) {
            state.currentSong = action.payload
        },
        changePlayListState(state, action) {
            state.playList = action.payload
            console.log(action)
        },
        changePlayMusicModeState(state, action) {
            state.playMusicMode = action.payload
            // console.log(action.payload)
        },
        changeLyricListState(state, action) {
            state.lyricList = action.payload
            // console.log(action.payload)
        },
        changeCurrentLyricIndexState(state, action) {
            state.currentLyricIndex = action.payload
            // console.log(action.payload)
        },
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

        [getLyricDetail.fulfilled](state, { payload }) {
            // state.songDetail = payload.songs
            console.log(payload)
        },
        // 失败
        [getLyricDetail.rejected](state, err) {
            console.log('banners加载失败')
            console.log(err)

        },
        // 加载中
        [getLyricDetail.pending](state) {
        },



    }


})




// 导出同步action函数
export const { getBannerAciton, changeCurrentSongIndexState, changeCurrentSongState, changePlayListState, changePlayMusicModeState, changeLyricListState,changeCurrentLyricIndexState } = playSlice.actions

// 导出
export default playSlice.reducer
import React, { memo, useCallback, useState } from 'react'
import { Control, Operator, PlaybarWrapper, PlayInfo } from './style'
import { Slider } from 'antd';
import { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSongDetail } from './store/slice';
import { formatDuration, getSizeImage, getPlaySong } from '../../../utils/fomat-utils';
import { NavLink } from 'react-router-dom';



const JKPlayBar = memo(() => {
  // state区
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)


  // redux区
  const dispatch = useDispatch();
  const playbarReducer = useSelector(state => state.playBarSlice, shallowEqual)

  const currentSong = playbarReducer.songDetail[0] ||''

  const picUrl = (currentSong && currentSong.al.picUrl) || ""
  const songName = (currentSong && currentSong.name) || ""
  const singerName = (currentSong && currentSong.ar[0].name) || ""
  const duration = (currentSong && currentSong.dt) || 0;
  const durationFomat = formatDuration(duration)
  const currentTimeFomat = formatDuration(currentTime)

  // const progress = currentTime / duration *100

  // console.log(currentSong)

  // ref区
  const audioRef = useRef();

//生命周期区

useEffect(() => {
  dispatch(getSongDetail(167876))
  
}, [dispatch])


useEffect(() => {
  audioRef.current.src =getPlaySong(currentSong.id)
}, [currentSong])

  // 方法区
  // 播放歌曲
  const playMusic = useCallback(() => {
    console.log(audioRef)
    // audioRef.current.src = getPlaySong(currentSong.id)

    // 调用播放方法
    if(!isPlaying){
      audioRef.current.play()
 
    }else{
      audioRef.current.pause()
    }

    setIsPlaying(!isPlaying);
  },[isPlaying])

  const timeUpdate = (e) => {

    // 在不滑动时我们才随时间设置进度条
    if (!isChanging) {

      // 设置当前时间
      let currentTimeMs = e.target.currentTime * 1000
      setCurrentTime(currentTimeMs)

      setProgress(currentTime / duration * 100)

    }
    // console.log(e.target.currentTime)
  }

  // 当我们传入方法到一个自定义组件时，一定要是用useCallback，因为要不使用是useCallback 组件重绘，我们的方法也会被重新再载入，不使用useCallBack会影响性能
  //  滑动中执行的函数
  const sliderChange = useCallback((value) => {
    console.log("change", value)

    let currentTime = (value / 100) * duration

    // 设定 value 正在变化的flag
    setIsChanging(true)
    //滑动的时候旁边的时间也跟着变化
    setCurrentTime(currentTime)
    setProgress(value)

  }, [duration])

  // 滑动完毕执行的函数
  const sliderAfterChange = useCallback((value) => {

    let currentTime = (value / 100) * duration
    let currentTimeMs = currentTime / 1000
    audioRef.current.currentTime = currentTimeMs

    // 这里设置时间 是为了解决 拖拽进度条，slider位置反复跳转的BUG
    setCurrentTime(currentTime)
    setIsChanging(false)


    //如果音乐是暂停的，我们拖拽slider 拖拽完毕后 让他播放
    if(!isPlaying){
      playMusic()
    }

    console.log("end", value)
  }, [duration,isPlaying,playMusic])



  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control isPlaying={isPlaying}>
          <button className='sprite_player prev'></button>
          <button className='sprite_player play' onClick={e => playMusic()}></button>
          <button className='sprite_player next'></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            {/* <a href='/todo'>
              <img src={getSizeImage(picUrl, 35)} alt=''></img>
            </a> */}

            <NavLink to='/discover/player'>
              <img src={getSizeImage(picUrl, 35)} alt=''></img>
            </NavLink>

          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{songName}</span>
              <a href="/todo" className='singer-name'>{singerName}</a>
            </div>
            <div className='progress'>
              <Slider defaultValue={0} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className='time'>
                <span className='now-time'>{currentTimeFomat}</span>
                <span className='divider'>/</span>
                <span className='duration'>{durationFomat}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>

          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop'></button>
            <button className='sprite_player btn playlist'>5</button>

          </div>


        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} />
    </PlaybarWrapper>
  )
})

export default JKPlayBar
import React, { memo ,useEffect} from 'react'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import RecommendHeader from './recommendHeader'
import JKThemeCover from '@/components/common/theme-cover';

import {RecommendWrapper} from './style'

import { getHotRecommendData } from '@/pages/discover/sonPages/recommend/store/slice';

const JKHotRecommend = memo(() => {
  const dispatch =useDispatch();
  const recommendReducer =useSelector(state=>state.recommendSlice,shallowEqual)
  // console.log(recommendReducer)
  
  useEffect(()=>{
    dispatch(getHotRecommendData())
  },[dispatch])


  return (
    <RecommendWrapper>
      <RecommendHeader title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]}>
      </RecommendHeader>
      <div className='recommend-list'>
          {
            recommendReducer.hotRecommends.map((item,index)=>{
              return (
              <JKThemeCover  key={item.id}  info={item}>
                </JKThemeCover>)
            })
          }
        </div>
    </RecommendWrapper>
  )
})

export default JKHotRecommend
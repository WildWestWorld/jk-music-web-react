import React, { memo, useEffect } from 'react'
import RecommendHeader from '@/components/discover/recommend/hotRecommend/recommendHeader'
import { RankingWrapper } from './style'

import { getTopList } from '../../../../api/recommend'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHighRankData } from '../../../../pages/discover/sonPages/recommend/store/slice'


const JKRecommendRank = memo(() => {
  const dispatch = useDispatch()
  const recommendSlice = useSelector(state=>state.recommendSlice,shallowEqual)
  console.log(recommendSlice,"Slice")
  useEffect(()=>{
    dispatch(getHighRankData())

    getTopList(0).then((res)=>{
      console.log(res)
    })
  },[dispatch])

  return (
    <RankingWrapper>
        <RecommendHeader title="排行榜"></RecommendHeader>
        <div>测试</div>
    </RankingWrapper>
  )
})

export default JKRecommendRank
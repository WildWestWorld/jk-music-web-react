import React, { memo, useEffect } from 'react'
import RecommendHeader from '@/components/discover/recommend/hotRecommend/recommendHeader'
import { RankingWrapper } from './style'

import { getTopList } from '../../../../api/recommend'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHighRankData ,getNewRankData,getOriginRankData} from '../../../../pages/discover/sonPages/recommend/store/slice'
import JKTopRanking from './top-ranking'


const JKRecommendRank = memo(() => {
  const dispatch = useDispatch()
  const recommendSlice = useSelector(state=>state.recommendSlice,shallowEqual)

  useEffect(()=>{
    dispatch(getHighRankData())
    dispatch(getNewRankData())
    dispatch(getOriginRankData())

    getTopList(0).then((res)=>{
      console.log(res)
    })
  },[dispatch])

  return (
    <RankingWrapper>
        <RecommendHeader title="排行榜"></RecommendHeader>
        {/* 排行榜的背景图片 */}
        <div className='tops-rank-bgc'>
          <JKTopRanking info={recommendSlice.highRankPlayList}></JKTopRanking>
          <JKTopRanking info={recommendSlice.newRankPlayList}></JKTopRanking>
          <JKTopRanking info={recommendSlice.originRankPlayList}></JKTopRanking>

        </div>
    </RankingWrapper>
  )
})

export default JKRecommendRank
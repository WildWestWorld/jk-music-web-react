import React, { memo } from 'react'
import { connect } from 'react-redux'
import JKTopBanner from '@/components/discover/recommend/topBanner'
import JKHotRecommend from '@/components/discover/recommend/hotRecommend'
import JKNewAlbum from '@/components/discover/recommend/newAlbum'
import JKRecommendRank from '@/components/discover/recommend/recommendRank'

import { getTopBannerAciton } from './store/action'
// import{loadData} from './store/slice'
// import{getBannerAciton} from './store/slice'

import {RecommendWrapper,Content,RecommendLeft,RecommendRight} from './style'


const mapStateToProps=(state)=>{
  return {
    topBanners:state
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    getBanners:()=>{
      dispatch(getTopBannerAciton())
    }
  }
}



const JKRecommend = (props) => {
  // console.log(props)
  // const getBanners = props.getBanners

  // const dispatch =useDispatch();
  // const recommendReducer =useSelector(state=>state.recommendSlice,shallowEqual)
  // console.log(recommendReducer)
  // useEffect(()=>{
  //   // dispatch(getBannerAciton())
  //   dispatch(loadData())
  // },[dispatch])

  return (
    <RecommendWrapper>
      <JKTopBanner></JKTopBanner>
      <Content className='wrap-v2'>
        <RecommendLeft>
          <JKHotRecommend></JKHotRecommend>
          <JKNewAlbum></JKNewAlbum>
          <JKRecommendRank></JKRecommendRank>
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}


export default connect(mapStateToProps,mapDispatchToProps) (memo(JKRecommend));
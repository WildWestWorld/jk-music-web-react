import React, { memo,useCallback,useEffect, useRef, useState } from 'react'
import { useDispatch,useSelector,shallowEqual} from 'react-redux';
import { loadData } from '@/pages/discover/sonPages/recommend/store/slice';

import {BannerWrapper,BannerLeft,BannerRight,BannerControl} from './style'
import { Carousel } from 'antd';


const JKTopBanner = memo(() => {
  // state
  const [currentIndex,setCurrentIndex]=useState(0)

  const dispatch =useDispatch();
  const recommendReducer =useSelector(state=>state.recommendSlice,shallowEqual)
  
  useEffect(()=>{
    // dispatch(getBannerAciton())
    dispatch(loadData())
  },[dispatch])

  const bannerRef=useRef()


  const beforeChangeBySelf= useCallback((from,to)=>{
      setCurrentIndex(to)
  },[])
  // const beforeChangeBySelf= (from,to)=>{
  //   setCurrentIndex(to)
  // }
  const bgImage =recommendReducer.topBanners[currentIndex] && (recommendReducer.topBanners[currentIndex].imageUrl+"?imageView&blur=40x20")

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className='banner wrap-v2'>
        <BannerLeft>
            <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={beforeChangeBySelf}>
              {
                recommendReducer.topBanners.map((item,index)=>{
                  return (
                    <div className='banner-item' key={item.imageUrl}>
                      <img className="image" src={item.imageUrl} alt={item.typeTitle}></img>
                    </div>
                  )

                })
              }
            </Carousel>
        </BannerLeft>

        <BannerRight></BannerRight>
        <BannerControl>

          <button className='btn left' onClick={e=>bannerRef.current.prev()}></button>
          <button className='btn right' onClick={e=>bannerRef.current.next()}></button>

        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default JKTopBanner
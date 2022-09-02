import React, { memo, useEffect, useRef } from 'react'
import RecommendHeader from '@/components/discover/recommend/hotRecommend/recommendHeader'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getNewAlbumData } from '../../../../pages/discover/sonPages/recommend/store/slice'
import { AlbumWrapper } from './style'

import { Carousel } from 'antd'
import JKAlbumCover from '../../../common/album-cover'


const JKNewAlbum = memo(() => {

  const dispatch = useDispatch()
  const recommendReducer =useSelector(state=>state.recommendSlice,shallowEqual)
  const newAlbums = recommendReducer.newAlbums
  
  const carouselRef=useRef()

  useEffect(()=>{
   dispatch(getNewAlbumData())
  },[dispatch])  

  return (
    <AlbumWrapper>
        <RecommendHeader title="新碟上架"></RecommendHeader>

        <div className="content">
          <button className='arrow arrow-left sprite_02' onClick={e=>carouselRef.current.prev()}></button>
            <div className='album'>
              <Carousel dots={false} ref={carouselRef}>
                {
                  [0,1].map((item,index)=>{
                    return (
                      <div key={item} className='page'>{

                          newAlbums.slice(item*5,(item+1)*5).map((iten,index)=>{
                            return (
                              <JKAlbumCover key={iten.id} info={iten} size={100} width={118}  bgp="-570px"></JKAlbumCover>
                            )
                          })
                      }</div>
                    )
                  })
                }
              </Carousel>
            </div>
          <button className='arrow arrow-right sprite_02' onClick={e=>carouselRef.current.next()}></button>

          {/* {
            newAlbums.map((item,index)=>{
              return (
                <div key={item.picUrl}>{item.name}</div>
              )
            })
          } */}
        </div>
    </AlbumWrapper>
  )
})

export default JKNewAlbum
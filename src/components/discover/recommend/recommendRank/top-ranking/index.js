import React, { memo, useEffect } from 'react'
import { playMusicLogical } from '@/pages/player/store/slice'
import { TopRankingWrapper } from './style'
import { useDispatch } from 'react-redux'

const JKTopRanking = memo((props) => {
  
  const {info} = props
  const {tracks =[]} = info

  const dispatch =useDispatch();
  useEffect(()=>{
  })
  const playMusic =(item)=>{
    const id  = item.id
    console.log(item.id)
    dispatch(playMusicLogical(id))
  }

  return (
  
    <TopRankingWrapper>
      <div className='header'>
        <div className='image'>
          <img src={info.coverImgUrl} alt=''></img>
          <a href='/todo' className='image_cover'>ranking</a>
        </div>

        <div className='info'>
          <a href='/todo'>{info.name}</a>
          <div>
            <button className='btn play sprite_02'></button>
            <button className='btn favor sprite_02'></button>
          </div>
        </div>
      </div>

      <div className='list'>
        {
          tracks.slice(0,10).map((item,index)=>{
            return (
              <div key={item.id} className='list-item'>
                  <div className='rank'>{index +1 }</div>
                  <div className='info'>
                    <span className='name text-nowrap'>{item.name}</span>

                    <div className='operate'>
                      <button className='btn sprite_02 play' onClick={e=>playMusic(item)}></button>
                      <button className='btn sprite_icon2 addto'></button>
                      <button className='btn sprite_02 favor'></button>
                    </div>
                  </div>
              </div>
            )
          })
        }
      </div>

      <div className='footer'>
        <a href='/todo '>查看全部&gt;</a>
      </div>
    </TopRankingWrapper>
  )
})

export default JKTopRanking
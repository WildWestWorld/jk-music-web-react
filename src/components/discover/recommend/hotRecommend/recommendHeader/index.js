import React, { memo } from 'react'
 import {HeaderWrapper} from './style'
import propTypes from 'prop-types'

const RecommendHeader = memo((props) => {
  const {title,keywords} =props;

  return (
    <HeaderWrapper  className='sprite_02'>
      <div className="left">
        <div ></div>
        <h3 className='title'>{title}</h3>
        <div className='keyword'>
          {
            keywords.map((item,index)=>{
              return (
                <div className='item' key={item}>
                  <a href='todo'>{item}</a>
                  <span className='divider'>|</span>
                </div>
              )
            })
          }
        </div>
        
      </div>
      <div className="right">
        <a href="todo">更多</a>
      </div>
    </HeaderWrapper>
  )
})

RecommendHeader.propTypes ={
  title:propTypes.string.isRequired,
  keywords:propTypes.array
}

RecommendHeader.defaultProps ={
  keywords:[]
}


export default RecommendHeader
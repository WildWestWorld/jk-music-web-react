import React, { memo } from 'react'
import {ThemeCoverWrapper} from './style'
import {getCount} from '@/utils/fomat-utils'
const JKThemeCover = memo((props) => {
    const {info}=props 

  return (
    <ThemeCoverWrapper>
        <div className='cover-top'>
            <img src={info.picUrl} alt=''></img>
            <a  href="/todo" alt="" className="cover sprite_covor">
                <div className="info sprite_covor">
                    <span>
                    <i className="sprite_icon erji"></i>
                    {getCount(info.playCount)}
                    </span>
                    <i className="sprite_icon play"></i>
                </div>
            </a>             
        </div>

        <div className="cover-bottom ">
        {info.name}
        </div>

        {/* <div className="cover-source">
            By 用户{info.id !== null?info.id:info.creator.nickname}
        </div> */}
    </ThemeCoverWrapper>
  )
})

export default JKThemeCover
import React, { memo, useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'


import { DiscoverWrapper,TopMenu } from './style'
import {discoverMenu} from "@/common/local-data"
import request  from '@/api/request'

const JKDiscover = memo((props) => {

    useEffect(()=>{
      request({
        url:"/banner"
      }).then(res=>{
      })
    },[])


  const route =props.route
  return (
    <DiscoverWrapper>
      <div className='top'>
        {/* 这个wrap-v1是我们在App,js里面全局引入的他的实际来源是assets/csss ,作用是居中*/}
          <TopMenu className='wrap-v1'>
              {discoverMenu.map((item,index)=>{
                return(
                  <div className='item' key={item.title}>
                    <NavLink to={item.link}>{item.title}</NavLink>
                  </div>
                )
              })}
          </TopMenu>
      </div>
      {renderRoutes(route.routers)}

    </DiscoverWrapper>
  )
})

export default JKDiscover
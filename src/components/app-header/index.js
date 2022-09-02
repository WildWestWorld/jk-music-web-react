import React, { memo } from 'react'

import { NavLink } from 'react-router-dom'

import {HeaderWrapper,HeaderLeft,HeaderRight} from './style'

import {headerLinks} from '@/common/local-data'

import {Input} from 'antd';


import {SearchOutlined } from '@ant-design/icons';

const JKAppHeader = memo(() => {
  // 页面Header代码
  const showSelectItem =(item,index)=>{
    // 前三个给路由跳转 后面所有给页面跳转
    if(index<3){
      return (
      <NavLink to={item.link} exact>
        {item.title}
        <i className='sprite_01 icon'></i>
      </NavLink>
      )
    }else{
      return <a href={item.link}>{item.title}</a>
    }
  }



  return (
    <HeaderWrapper>
      <div className='content'>
        <HeaderLeft>
          {/* 这里的a标签我们是不需要文字的，但是需要搜索引擎优化所以我们需要加一些文字，但又不想让他显示可以使用text-indent:-99999解决 */}
          <a href='/'  className="logo sprite_01"> </a>
          <div className='select-list'>
            {
              headerLinks.map((item,index)=>{
                return (
                  <div key={item.title} className='select-item'>
                    {showSelectItem(item,index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder='音乐/视频/电台/用户'   prefix={<SearchOutlined />}></Input>
          <div className='creator-center'>创作者中心</div>
          <div>登录</div>
        </HeaderRight>

      </div>
      <div className='divider'></div>

    </HeaderWrapper>
  )
})

export default JKAppHeader
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { playMusicLogical } from './store/slice';
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'

const JKPlayer = memo(() => {
    // redux区
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(playMusicLogical(123))
    },[dispatch])
    return (
        <PlayerWrapper>
            <div className='content wrap-v2'>
                <PlayerLeft>
                    <h2>HYPlayerInfo</h2>
                    <h2>HYSongContent</h2>
                </PlayerLeft>
                <PlayerRight>
                    <h2>HYSimiPlaylist</h2>
                    <h2>HYSimiSong</h2>
                    <h2>DownLoad</h2>
                </PlayerRight>
            </div>
        </PlayerWrapper>
    )
})

export default JKPlayer
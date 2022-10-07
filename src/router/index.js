import React from 'react';
import { Redirect } from "react-router-dom";

const JKDiscover = React.lazy(()=>import('@/pages/discover'))

// import JKDiscover from "@/pages/discover";
// JKDiscover 的子页面
import JKAlbum from "@/pages/discover/sonPages/album";
import JKArtist from "@/pages/discover/sonPages/artist";
import JKRadio from "@/pages/discover/sonPages/radio";
import JKRanking from "@/pages/discover/sonPages/ranking";
import JKRecommend from "@/pages/discover/sonPages/recommend";
import JKSongs from "@/pages/discover/sonPages/songs";



import JKFriend from "@/pages/friend";
import JKMy from "@/pages/my";
import JKPlayer from "../pages/player";

const routers =[
 {
     path:"/",
     render:()=>{
        return <Redirect to="/discover"></Redirect>
     },
     exact:true
 },{
    path:"/discover",
    component:JKDiscover,
    routers:[
        {
            path:"/discover",
            render:()=>{
                 return <Redirect to="/discover/recommend"></Redirect>
            },
            exact: true,
        },{
            path:"/discover/album",
            component:JKAlbum
        },{
            path:"/discover/artist",
            component:JKArtist
        },{
            path:"/discover/radio",
            component:JKRadio
        },{
            path:"/discover/ranking",
            component:JKRanking
        },{
            path:"/discover/recommend",
            component:JKRecommend
        },{
            path:"/discover/songs",
            component:JKSongs
        },{
            path:"/discover/player",
            component:JKPlayer
        },

    ]
}, {
    path:"/friend",
    component:JKFriend
}, {
    path:"/my",
    component:JKMy
},
 
];

export default routers;
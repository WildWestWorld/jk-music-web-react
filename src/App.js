import React, { memo } from 'react';


import {renderRoutes} from 'react-router-config';

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';


import routers from './router'
// import store from './store';
import { reduxStore } from './store';


import JKAppHeader from '@/components/app-header'
import JKAppFooter from '@/components/app-footer'
import JKPlayBar from './components/common/player-bar';

export default memo(function app() {
    return (
        <Provider store={reduxStore}>
        <BrowserRouter>
            <JKAppHeader></JKAppHeader>
            {renderRoutes(routers)}
            <JKAppFooter></JKAppFooter>
            <JKPlayBar></JKPlayBar>
        </BrowserRouter>
        </Provider>
    )
})

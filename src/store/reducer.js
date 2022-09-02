import { combineReducers } from "redux";
import {recommendReducer} from "@/pages/discover/sonPages/recommend/store"

const totolReducer=combineReducers({
     recommendReducer:recommendReducer
})

export default totolReducer
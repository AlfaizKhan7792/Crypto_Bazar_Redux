import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice"
import CoinsReducer from "./Coins/CoinsSlice"
import tradeReducer from "./Trade/TradeSlice";
import earnReducer from "./Earn/EarnSlice";
import nftReducer from "./NFTs/NFTSlice";
import learnReducer from "./Learn/LearnSlice";

const store = configureStore({
    reducer : {
Auth : AuthReducer,
Coins : CoinsReducer,
trade : tradeReducer,
earn: earnReducer,
nfts: nftReducer,
learn: learnReducer, 

    }
})


export default store
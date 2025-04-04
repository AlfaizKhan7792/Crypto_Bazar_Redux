// import { Image } from 'lucide-react'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { GetTrendingCoins } from '../features/Coins/CoinsSlice'
// import Loading from './Loading'

// const TrendingCoins = () => {

//     const {trendingCoins , isSuccess , isLoading , isError , message} = useSelector(state => state.Coins)

//     const dispatch = useDispatch()

//     useEffect(() =>{
// dispatch(GetTrendingCoins())
// if(isError){
//     console.log(message);
// }
//     },[isError , message])

//     console.log(trendingCoins);
//     console.log(trendingCoins?.content?.price);

//     if(isLoading){
//         return <Loading />
//     }

//   return (
//     <>
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             {[
//               {
//                 name: "Bitcoin",
//                 symbol: "BTC",
//                 price: "$43,567.89",
//                 change: "+2.34%",
//                 icon: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 name: "Ethereum",
//                 symbol: "ETH",
//                 price: "$3,245.67",
//                 change: "+1.56%",
//                 icon: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 name: "Solana",
//                 symbol: "SOL",
//                 price: "$134.56",
//                 change: "+5.67%",
//                 icon: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 name: "Cardano",
//                 symbol: "ADA",
//                 price: "$0.567",
//                 change: "-0.89%",
//                 icon: "/placeholder.svg?height=40&width=40",
//               },
//             ].map((coin, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700"
//               >
//                 <Image
//                   src={coin.icon || "/placeholder.svg"}
//                   alt={coin.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <div className="font-medium">{coin.name}</div>
//                     <div className={coin.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{coin.change}</div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-zinc-400">{coin.symbol}</div>
//                     <div className="font-medium">{coin.price}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//     </>
//   )
// }

// export default TrendingCoins














import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTrendingCoins } from '../features/Coins/CoinsSlice'
import Loading from './Loading'

const TrendingCoins = ({ showAll }) => {
    const { trendingCoins, isLoading, isError, message } = useSelector(state => state.Coins)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetTrendingCoins())
        if (isError) {
            console.log(message);
        }
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Loading />
    }

    // 🔹 Show only 4 coins initially, or all if showAll is true
    const displayedCoins = showAll ? trendingCoins : trendingCoins?.slice(0, 4);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayedCoins?.length > 0 ? (
                displayedCoins.map((coin, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700"
                    >
                        <img
                            src={coin?.icon || "/placeholder.svg"}
                            alt={coin?.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{coin?.name}</div>
                                <div className={coin?.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                                    {coin?.change}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-zinc-400">{coin?.symbol}</div>
                                <div className="font-medium">{coin?.price}</div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No trending coins available</p>
            )}
        </div>
    )
}

export default TrendingCoins


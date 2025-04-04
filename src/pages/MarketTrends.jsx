
// import React from 'react'
// import TrendingCoins from '../components/TrendingCoins'

// const MarketTrends = () => {
//   return (
//     <>
//      {/* Market Trends */}
//      <section className="py-16 px-15 flex justify-center border-t border-zinc-800">
//         <div className="container">
//           <div className="mb-10 flex flex-col items-center text-center">
//             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Market Trends</h2>
//             <p className="mt-4 max-w-[700px] text-zinc-400">
//               Stay updated with real-time cryptocurrency prices and market trends
//             </p>
//           </div>
//         <TrendingCoins />
//           <div className="mt-8 flex justify-center">
//             <button variant="outline" className="border py-2 px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800">
//               View All Markets
//             </button>
//           </div>
//         </div>
//       </section> 
//     </>
//   )
// }

// export default MarketTrends




















import React, { useState } from 'react'
import TrendingCoins from '../components/TrendingCoins'

const MarketTrends = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
     {/* Market Trends */}
     <section className="py-16 px-15 flex justify-center border-t border-zinc-800">
        <div className="container">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Market Trends</h2>
            <p className="mt-4 max-w-[700px] text-zinc-400">
              Stay updated with real-time cryptocurrency prices and market trends
            </p>
          </div>
          
          {/* 🔹 Pass showAll as prop to TrendingCoins */}
          <TrendingCoins showAll={showAll} />

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="border py-2 px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800"
            >
              {showAll ? "Show Less" : "View All Markets"}
            </button>
          </div>
        </div>
      </section> 
    </>
  )
}

export default MarketTrends

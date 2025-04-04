import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button"; 

const CoinCard = ({ coin }) => {

  // const dispatch = useDispatch()

//   const handleAddToCard = (coin) =>{
//     console.log(coin);
// dispatch(AddToCard(coin))
//   }
  

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg transition hover:scale-105 hover:border-zinc-700">
      {/* 🔹 Coin Image */}
      <img
        src={coin?.thumb}
        alt={coin?.name}
        className="w-16 h-16 mx-auto rounded-full"
      />

      {/* 🔹 Coin Name */}
      <h3 className="text-xl font-semibold text-white mt-4">{coin?.name}</h3>

      {/* 🔹 Coin Symbol */}
      <p className="text-zinc-400 text-sm mt-4 mb-8">Symbol: {coin?.symbol}</p>

{/* Coin Price */}
<p className="text-lg font-semibold text-green-600">
  {coin.market_data 
    ? `$${coin.market_data.current_price.usd.toFixed(2)}` 
    : "Price Not Available"}
</p>




<span className="flex flex-col gap-4 lg:flex-row lg:justify-around">
  {/* 🔹 View Details Button */}
  <Link
    to={`/coin/${coin?.id}`}
    className="bg-white text-zinc-900 font-semibold px-5 py-2 rounded-lg transition hover:bg-zinc-300 w-full lg:w-auto"
  >
    View Details
  </Link>
  {/* <Button onClick={() => handleAddToCard(coin)} className="w-full lg:w-auto">
    Add To Card
  </Button> */}
</span>


    </div>
  );
};

export default CoinCard;



















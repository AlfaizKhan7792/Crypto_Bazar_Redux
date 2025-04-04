import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, setTradePair } from "../features/Trade/TradeSlice";
import { Button } from "../components/ui/button";

const Trade = () => {
  const dispatch = useDispatch();
  const { coins, tradePair, status } = useSelector((state) => state.trade);
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const handleTrade = () => {
    if (selectedCoin) {
      dispatch(setTradePair(selectedCoin));
    }
  };

  return (
 <div className="min-h-screen flex items-center justify-center">
       <div className="max-w-7xl mx-auto my-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white text-center">Trade Cryptos</h2>

      {/* Status */}
      {status === "loading" && <p className="text-yellow-400 text-center mt-4">Loading coins...</p>}
      {status === "failed" && <p className="text-red-500 text-center mt-4">Error fetching coins.</p>}

      {/* Coin Selector */}
      <select
        className="w-full mt-4 p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        <option value="">Select a Coin</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </option>
        ))}
      </select>

      {/* Trade Button */}
      <Button onClick={handleTrade} className="mt-4 w-full">
        Trade Now
      </Button>

      {/* Selected Pair */}
      {tradePair && (
        <p className="text-green-500 mt-4 text-center">
          Trading: <span className="font-semibold">{tradePair}</span>
        </p>
      )}
    </div>
 </div>
  );
};

export default Trade;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStakingOptions, stakeCrypto } from "../features/Earn/EarnSlice";
import { Button } from "../components/ui/button";

const Earn = () => {
  const dispatch = useDispatch();
  const { stakingOptions, status, rewards } = useSelector((state) => state.earn);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchStakingOptions());
  }, [dispatch]);

  const handleStake = () => {
    if (selectedCoin && amount) {
      dispatch(stakeCrypto({ coin: selectedCoin, amount }));
      setAmount("");
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen">
     <div className="max-w-4xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white text-center">Earn Rewards by Staking</h2>

      {/* Status */}
      {status === "loading" && <p className="text-yellow-400 text-center mt-4">Loading options...</p>}
      {status === "failed" && <p className="text-red-500 text-center mt-4">Error fetching options.</p>}

      {/* Staking Options */}
      <select
        className="w-full mt-4 p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
      >
        <option value="">Select a Coin to Stake</option>
        {stakingOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} ({option.apy}% APY)
          </option>
        ))}
      </select>

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mt-4 p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg"
      />

      {/* Stake Button */}
      <Button onClick={handleStake} className="mt-4 w-full">
        Stake Now
      </Button>

      {/* Rewards Section */}
      {rewards.length > 0 && (
        <div className="mt-6 p-4 bg-zinc-800 rounded-lg text-white">
          <h3 className="text-lg font-semibold">Your Rewards</h3>
          <ul className="mt-2">
            {rewards.map((reward, index) => (
              <li key={index} className="text-green-400">
                {reward.coin}: {reward.amount} earned
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
   </div>
  );
};

export default Earn;

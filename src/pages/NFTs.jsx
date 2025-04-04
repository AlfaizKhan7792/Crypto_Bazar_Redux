import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNFTs } from "../features/NFTs/NFTSlice";

const NFTs = () => {
  const dispatch = useDispatch();
  const { nfts, status, error } = useSelector((state) => state.nfts);

  useEffect(() => {
    dispatch(fetchNFTs());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Top NFTs</h1>
      {status === "loading" && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-zinc-800 p-4 rounded-lg shadow-lg">
            <img src={nft?.symbol} alt={nft?.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold text-white mt-3">{nft?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTs;

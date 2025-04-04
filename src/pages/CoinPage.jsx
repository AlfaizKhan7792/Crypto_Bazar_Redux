import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { AddToCard, GetSingleCoin } from "../features/Coins/CoinsSlice";
import { Button } from "../components/ui/button";

const CoinPage = () => {
  const { id } = useParams(); // Get coin ID from URL
  const dispatch = useDispatch();
  const { coin, isLoading, isError, message } = useSelector((state) => state.Coins);

  useEffect(() => {
    dispatch(GetSingleCoin(id)); // Fetch coin data on mount
  }, [dispatch, id]);

  const handleAddToCard = (coin) =>{
    dispatch(AddToCard(coin))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  if (!coin) return <div className="text-center text-red-500 text-lg">Coin Not Found!</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md my-6">
        {/* Back Button */}
        <div className="mt-4 text-center float-end">
        <Link to={`/search-form`} className="text-gray-500">
         <Button>
         ← Back to Search
         </Button>
        </Link>
      </div>


      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left: Image */}
        <div className="w-full h-32">
          <img src={coin?.image?.large} alt={coin.name} className="w-[100vw] h-full object-contain" />
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-2xl font-bold">{coin.name}</h1>
          <h2 className="text-lg text-gray-600">{coin.symbol?.toUpperCase()}</h2>
          <p className="text-lg font-semibold text-green-600">${coin.market_data?.current_price?.inr?.toFixed(2)}</p>
          <button onClick={() => handleAddToCard(coin)} type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
          <p className="mt-3 text-gray-700">{coin.description?.en}...</p>
        </div>

       

      </div>

      {/* Official Website Link */}
      <div className="mt-6 text-center">
        <a
          href={coin?.links?.homepage[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline text-lg"
        >
          <button className="border rounded-md p-3 w-full bg-blue-500 hover:bg-blue-400" >
          Official Website
          </button>
        </a>
      </div>
    </div>
  );
};

export default CoinPage;

import React, { useEffect } from "react";
import CoinCard from "../components/CoinCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const SearchPage = () => {

  const {coins , isLoading , isError , message} = useSelector(state => state.Coins)

useEffect(() =>{
if(isError){
  toast.error(message)
  console.log(message);
}

},[isError , message])

  if(isLoading){
    return <Loading />
  }


  if (!coins || coins.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-center text-white text-7xl my-auto">
          No Coin's Found!!
        </h1>
        <img src="https://bhoomiplus.com/landing/no-result.gif" alt="No Result Found" />
      </div>
    );
  }
  

  return (
    <section className="py-16 px-6 flex justify-center bg-zinc-950">
      <div className="container mx-10 text-center">
        {/* 🔹 Page Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your_Search
        </h2>

        {/* 🔹 Card Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coins?.map((coin) => (
            <CoinCard key={coin?.id} coin={coin} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

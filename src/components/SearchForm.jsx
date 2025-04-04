import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSearchCoins } from "../features/Coins/CoinsSlice";

const SearchForm = () => {

  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
e.preventDefault()
dispatch(GetSearchCoins(query))
navigate(`/coin/search/${query}`)
  }

  return (
    <section className="py-16 min-h-[90vh] px-6 flex items-center justify-center bg-black">
      <div className="container max-w-lvh text-center">
        {/* 🔹 Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Find Your Favorite Coin
        </h2>

        {/* 🔹 Paragraph */}
        <p className="mt-4 text-zinc-400">
          Search for any cryptocurrency and get real-time market trends instantly.
        </p>

        {/* 🔹 Search Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-lg">
          <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
            type="text"
            required
            placeholder="Search coin name..."
            className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 placeholder-zinc-500"
          />
        <button
            type="submit"
            className="bg-white text-zinc-900 font-semibold px-5 py-2 rounded-lg transition hover:bg-zinc-300"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;

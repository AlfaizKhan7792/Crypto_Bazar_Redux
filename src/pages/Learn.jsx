import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLearnContent } from "../features/Learn/LearnSlice";

const Learn = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.learn);

  useEffect(() => {
    dispatch(fetchLearnContent());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-5 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Learning Hub</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-400 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;

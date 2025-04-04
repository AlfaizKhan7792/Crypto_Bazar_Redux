import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from '../components/ui/button';
import { RemoveCard, UpdateQuantity } from '../features/Coins/CoinsSlice';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const CardPage = () => {
  const { CardCoins, isLoading } = useSelector(state => state.Coins);
  const dispatch = useDispatch();

  const totalQuantity = CardCoins.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = CardCoins.reduce((sum, item) => sum + item?.market_data?.current_price?.inr?.toFixed(2) * item.quantity, 0);

  const handleDecrese = (id, quantity) => {
    if (quantity > 1) {
      dispatch(UpdateQuantity({ id, amount: -1 }));
    }
  };

  const handleIncrese = (id) => {
    dispatch(UpdateQuantity({ id, amount: 1 }));
  };

  if (isLoading) {
    return <Loading />;
  }

  // ✅ No Card Found Condition
  if (!CardCoins || CardCoins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <Link to="/search-form">
          <Button className="mb-8 float-end">Go to Search</Button>
        </Link>
        <h1 className="text-4xl font-bold">No Card Yet</h1>
        <img src="https://cdnl.iconscout.com/lottie/premium/thumb/empty-cart-8302196-6635017.gif" alt="No Card" className="w-64 h-64 mt-4" />
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="my-4 mx-20 text-center float-end">
        <Link to={`/search-form`} className="text-gray-500">
          <Button className="float-end">← Back to Search</Button>
        </Link>
      </div>

      <div className="flex mx-20 flex-col md:flex-row gap-4 p-4 border rounded-lg">
        {/* Left Side: Coin List */}
        <div className="w-full md:w-2/3 border rounded-lg p-4">
          <ul className="space-y-4">
            {CardCoins.map((coin) => (
              <li key={coin?.id} className="flex items-start justify-between border p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={coin?.image?.large} alt={coin?.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h1 className="text-lg font-bold">{coin?.name}  (<span className="text-sm text-gray-600">{coin?.symbol?.toUpperCase()}</span>)</h1>
                    <h2 className="text-gray-600">Price: ${coin?.market_data?.current_price?.inr?.toFixed(2)}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleDecrese(coin.id, coin.quantity)}
                        disabled={coin.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-300 disabled:opacity-50"
                      >
                        <Minus className='h-4 w-4' />
                      </button>
                      <span>{coin?.quantity}</span>
                      <button
                        onClick={() => handleIncrese(coin.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-300"
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(RemoveCard(coin?.id))}
                  className="text-red-500 text-sm font-bold px-2 border rounded hover:bg-red-500 hover:text-white"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Billing Section */}
        <div className="w-full md:w-1/3 border rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Billing Section</h2>
          <p className="font-semibold">Total Quantity: {totalQuantity}</p>
          <ul className="mt-2 space-y-2">
            {CardCoins.map((coin) => (
              <li key={coin?.id} className="text-sm flex justify-between border-b pb-1">
                <span>{coin?.name}</span>
                <span>${(coin?.market_data?.current_price?.inr * coin.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total Amount: ${totalAmount.toFixed(2)}</p>
          <Button className="w-full mt-4">Pay Now</Button>
        </div>
      </div>
    </>
  );
};

export default CardPage;

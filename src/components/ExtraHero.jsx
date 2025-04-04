import React, { useState, useEffect } from 'react';

const ExtraHero = () => {

         // Sample crypto data - in a real app, this would come from an API
  const [cryptoData, setCryptoData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 64832.51, change: 2.4 },
    { name: 'Ethereum', symbol: 'ETH', price: 3541.29, change: 1.8 },
    { name: 'Solana', symbol: 'SOL', price: 142.67, change: 4.2 },
    { name: 'Cardano', symbol: 'ADA', price: 0.45, change: -1.2 },
    { name: 'Polkadot', symbol: 'DOT', price: 6.32, change: 3.5 },
    { name: 'Binance Coin', symbol: 'BNB', price: 583.24, change: 0.7 }
  ]);

  // Background canvas dots state
  const [dots, setDots] = useState([]);

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(crypto => ({
          ...crypto,
          price: +(crypto.price * (1 + (Math.random() * 0.01 - 0.005))).toFixed(2),
          change: +(crypto.change + (Math.random() * 0.6 - 0.3)).toFixed(1)
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initialize background dots
  useEffect(() => {
    const generateDots = () => {
      const newDots = Array(40).fill().map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1
      }));
      setDots(newDots);
    };

    generateDots();
  }, []);

  // Animate background dots
  useEffect(() => {
    const animateDots = () => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          x: (dot.x + dot.speedX + 100) % 100,
          y: (dot.y + dot.speedY + 100) % 100
        }))
      );
    };

    const animation = setInterval(animateDots, 50);
    return () => clearInterval(animation);
  }, []);


  return (
    <>
        
     <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900">
       {/* Animated background */}
       <div className="absolute inset-0 opacity-20">
         {dots.map((dot, index) => (
          <div 
            key={index} 
            className="absolute rounded-full bg-blue-400"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}rem`,
              height: `${dot.size}rem`,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* Animated ticker */}
      <div className="absolute top-0 w-full overflow-hidden bg-gray-800 bg-opacity-40 backdrop-blur-sm">
        <div className="flex space-x-12 py-2 animate-marquee whitespace-nowrap">
          {cryptoData.concat(cryptoData).map((crypto, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="font-bold text-gray-200">{crypto.symbol}</span>
              <span className="text-gray-300">${crypto.price.toLocaleString()}</span>
              <span className={`text-xs ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change >= 0 ? '+' : ''}{crypto.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative flex flex-col items-center justify-center h-full px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
          <span className="block">Trade Cryptocurrencies</span>
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Securely & Efficiently
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-8">
          Experience lightning-fast transactions with bank-grade security. Join millions of traders worldwide on our award-winning platform.
        </p>
        
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Start Trading Now
        </button>

        {/* Market preview */}
        <div className="mt-16 w-full max-w-4xl">
          <h3 className="text-xl text-center text-gray-300 mb-4">Live Market Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cryptoData.slice(0, 6).map((crypto, index) => (
              <div 
                key={index} 
                className="bg-gray-800 bg-opacity-50 p-4 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-200">{crypto.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${crypto.change >= 0 ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'}`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold text-white">${crypto.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ExtraHero

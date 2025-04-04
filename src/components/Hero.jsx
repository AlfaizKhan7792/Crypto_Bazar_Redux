import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('buy');


  return (
    <>
      <section className="relative px-15 overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">

            {/* Left Section */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <div className="mb-2 inline-block rounded-full bg-purple-900/30 px-3 py-1 text-sm text-primary">
                  The Future of Trading
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Trade Crypto with <span className="text-primary">Confidence</span>
                </h1>
                <p className="mt-4 text-xl text-zinc-400">
                  Buy, sell, and store cryptocurrencies on the most trusted and secure platform.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
               <Link to="/search-form" >
               <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
               </Link>
               <Link to="/markets" >
               <button variant="outline" size="lg" className="border py-2 px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800">
                  Explore Markets
                </button>
               </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">$76B+</span>
                  <span className="text-sm text-zinc-400">24h Trading Volume</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">120+</span>
                  <span className="text-sm text-zinc-400">Countries Supported</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">99.9%</span>
                  <span className="text-sm text-zinc-400">Uptime</span>
                </div>
              </div>
            </div>
         
{/* Right Section */}
<div className="flex items-center justify-center">
      <div className="relative h-[400px] w-full max-w-md">
        {/* Background blur effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-gray-500/40 blur-3xl" />
        </div>
        
        {/* Main card */}
        <div className="relative z-10 h-full w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Quick Trade</h3>
            <button className="inline-flex items-center gap-1 text-zinc-400 px-3 py-1 rounded-md hover:bg-zinc-800">
              Advanced 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
          
          {/* Tabs */}
          <div>
            <div className="grid w-full grid-cols-2 bg-zinc-800/50 rounded-md overflow-hidden">
              <button 
                onClick={() => setActiveTab('buy')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'buy' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => setActiveTab('sell')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'sell' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>
            
            {/* Buy Tab Content */}
            {activeTab === 'buy' && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">I want to spend</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full px-3 py-2 rounded-md border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="min-w-24 py-2 px-4 rounded-md border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800">
                      USD
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">I will receive</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full px-3 py-2 rounded-md border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="min-w-24 py-2 px-4 rounded-md border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800">
                      BTC
                    </button>
                  </div>
                </div>
                
                <button className="w-full py-2 px-4 bg-white hover:bg-gray-300 text-black font-medium rounded-md transition-colors">
                  Buy Now
                </button>
              </div>
            )}
            
            {/* Sell Tab Content */}
            {activeTab === 'sell' && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">I want to sell</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full px-3 py-2 rounded-md border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="min-w-24 py-2 px-4 rounded-md border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800">
                      BTC
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">I will receive</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full px-3 py-2 rounded-md border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="min-w-24 py-2 px-4 rounded-md border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800">
                      USD
                    </button>
                  </div>
                </div>
                
                <button className="w-full py-2 px-4 bg-white hover:bg-gray-300 text-black font-medium rounded-md transition-colors">
                  Sell Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

          </div>
        </div>
      </section> 

    

    </>
  )
}

export default Hero

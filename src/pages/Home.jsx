import React from 'react'
import Hero from '../components/Hero'
import MarketTrends from './MarketTrends'
import HotItWork from '../components/HotItWork'
import CTA from '../components/CTA'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <>
      {/* <div className="flex min-h-screen flex-col bg-black text-white"> */}
     <Hero /> 
     <MarketTrends />
     <Features />
     <HotItWork />
     <Testimonials /> 
     <CTA />
     {/* </div> */}
    </>
  )
}

export default Home

import React from 'react'
import { ArrowRight } from 'lucide-react'

const CTA = () => {
  return (
    <>
      <section className="py-20 px-15 flex justify-center">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 to-gray-300/70 p-8 md:p-12">
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Trading?</h2>
                <p className="mt-4 text-zinc-200">
                  Join millions of users and start your crypto journey today. Trade with confidence on the most trusted
                  platform.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
              <button variant="outline" size="lg" className="border py-2 px-8 flex justify-center gap-3 items-center rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-700 bg-zinc-800">
                  Create Account <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                variant="outline" 
                size="lg" 
                className="border py-2 px-8 rounded-lg font-semibold border-zinc-300 text-white hover:bg-zinc-400"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default CTA

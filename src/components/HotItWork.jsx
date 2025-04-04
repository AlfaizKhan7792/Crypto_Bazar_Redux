import React from 'react'
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react'

const HotItWork = () => {
  return (
    <>
      {/* How It Works */}
      <section className="py-16 px-15 flex justify-center">
        <div className="container">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 max-w-[700px] text-zinc-400">
              Get started with cryptocurrency trading in just a few simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create an Account",
                description: "Sign up and complete verification in minutes",
              },
              {
                step: "02",
                title: "Deposit Funds",
                description: "Add funds using credit card, bank transfer, or crypto",
              },
              {
                step: "03",
                title: "Start Trading",
                description: "Buy and sell cryptocurrencies with ease",
              },
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-500/25 text-2xl font-bold text-primary">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
                {index < 2 && (
                  <div className="absolute left-1/2 top-8 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-800 to-transparent md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button size="lg" className="gap-2">
              Create Account <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HotItWork

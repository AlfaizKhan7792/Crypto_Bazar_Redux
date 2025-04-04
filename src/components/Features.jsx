import React from 'react'
import { BarChart2, CreditCard, Globe, Lock, Shield, Wallet } from "lucide-react"

const Features = () => {
  return (
    <>
       {/* Features */}
       <section className="py-16 px-15 flex justify-center bg-zinc-900/50">
        <div className="container">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose CryptoBazar</h2>
            <p className="mt-4 max-w-[700px] text-zinc-400">
              We provide the best trading experience with cutting-edge technology and security
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Secure Storage",
                description: "Industry-leading security measures to keep your assets safe",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "Global Access",
                description: "Trade from anywhere in the world with our global platform",
              },
              {
                icon: <BarChart2 className="h-10 w-10 text-primary" />,
                title: "Advanced Trading Tools",
                description: "Professional-grade charts and analysis tools for traders",
              },
              {
                icon: <CreditCard className="h-10 w-10 text-primary" />,
                title: "Multiple Payment Options",
                description: "Deposit and withdraw using various payment methods",
              },
              {
                icon: <Lock className="h-10 w-10 text-primary" />,
                title: "Insurance Protection",
                description: "Assets are covered by our comprehensive insurance policy",
              },
              {
                icon: <Wallet className="h-10 w-10 text-primary" />,
                title: "Crypto Wallet",
                description: "Manage all your digital assets in one secure wallet",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800 bg-black p-6 transition-all hover:border-zinc-700"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> 
    </>
  )
}

export default Features

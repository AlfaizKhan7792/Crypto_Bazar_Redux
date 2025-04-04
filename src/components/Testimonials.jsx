import React from 'react'

const Testimonials = () => {
  return (
    <>
     {/* Testimonials */}
     <section className="py-16 px-15 flex justify-center bg-zinc-900/50">
        <div className="container">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-[700px] text-zinc-400">
              Join thousands of satisfied traders from around the world
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "CryptoBazar has transformed how I trade. The platform is intuitive and the fees are the lowest I've found.",
                name: "Alex Johnson",
                title: "Professional Trader",
              },
              {
                quote:
                  "As a beginner, I found CryptoBazar incredibly easy to use. The educational resources helped me understand crypto trading.",
                name: "Sarah Williams",
                title: "New Investor",
              },
              {
                quote:
                  "The security features give me peace of mind. I've been using CryptoBazar for 3 years with zero issues.",
                name: "Michael Chen",
                title: "Long-term Investor",
              },
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col rounded-xl border border-zinc-800 bg-black p-6">
                <div className="mb-4 text-lg italic text-zinc-300">"{testimonial.quote}"</div>
                <div className="mt-auto">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-zinc-400">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> 
    </>
  )
}

export default Testimonials

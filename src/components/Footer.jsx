import { Wallet } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
       <footer className="border-t px-15 flex justify-center border-zinc-800 bg-black py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Link to="/" >
                <Wallet className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CryptoBazar</span></Link>
              </div>
              <p className="mt-4 text-zinc-400">The trusted platform for cryptocurrency trading and investment.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Exchange
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Institutional
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Wallet
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    NFT Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Market Updates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-zinc-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 md:flex-row">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} CryptoBazar. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Terms
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer> 
    </>
  )
}

export default Footer

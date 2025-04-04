// import React from 'react'
// import { Button } from './ui/button'
// import { Menu, Wallet } from "lucide-react"
// import { Link } from 'react-router-dom'

// const Header = () => {
//   return (
//     <>

//       <header className="sticky px-15 top-0 z-40 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
//         <div className="container flex h-16 items-center justify-between">
//          <Link to="/" >
//          <div className="flex items-center gap-2">
//             <Wallet className="h-6 w-6 text-primary" />
//             <span className="text-xl font-bold">CryptoBazar</span>
//           </div>
//          </Link>
//           <nav className="hidden md:flex items-center gap-6">
//             <Link to="/markets" className="text-sm font-medium text-zinc-400 hover:text-white">
//               Markets
//             </Link>
//             <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
//               Trade
//             </Link>
//             <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
//               Earn
//             </Link>
//             <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
//               NFTs
//             </Link>
//             <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
//               Learn
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex gap-2">
//            <Link to="/login" >
//            <button variant="outline" className="border py-2 px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800">
//                 Sign In
//               </button></Link>
//               <Link to="/register" ><Button>Register</Button></Link>
//             </div>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </div>
//         </div>
//       </header>
 
//     </>
//   )
// }

// export default Header
















import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, Wallet, ShoppingCart, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../features/Auth/AuthSlice';

const Header = () => {

  const {Users} = useSelector(state => state.Auth)
  const {CardCoins} = useSelector(state => state.Coins)

  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(LogoutUser())
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky px-15 top-0 z-40 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" onClick={closeMenu}>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoBazar</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/markets" className="text-sm font-medium text-zinc-400 hover:text-white">Markets</Link>
          <Link to="/trade" className="text-sm font-medium text-zinc-400 hover:text-white">Trade</Link>
          <Link to="/earn" className="text-sm font-medium text-zinc-400 hover:text-white">Earn</Link>
          <Link to="/nfts" className="text-sm font-medium text-zinc-400 hover:text-white">NFTs</Link>
          <Link to="/learn" className="text-sm font-medium text-zinc-400 hover:text-white">Learn</Link>
        </nav>
        
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            {Users ? (
              <>
                <Link to="/coin-card">
                  <Button variant="outline" 
                  size="md:lg"
                  className="border py-2 px-4 rounded-lg flex items-center gap-5 justify-center font-semibold border-zinc-800 text-white hover:bg-zinc-800"
                  >
                    <ShoppingCart className="h-5 w-5" /> {CardCoins.length}
                  </Button>
                </Link>
                <Button onClick={() => { handleLogout(); closeMenu(); }} 
                >
                  <LogOut className="h-5 w-5" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <button variant="outline" className="border py-2 px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800">
                    Sign In
                  </button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button onClick={() => setMenuOpen(!menuOpen)} variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 p-4 flex flex-col gap-4">
          <Link to="/markets" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Markets</Link>
          <Link to="#" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Trade</Link>
          <Link to="#" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Earn</Link>
          <Link to="#" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">NFTs</Link>
          <Link to="#" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Learn</Link>
          {Users ? (
            <>
             <Link to="/coin-card" onClick={closeMenu}>
                  <Button variant="outline" 
                  size="md:lg"
                  className="border py-2 flex items-center justify-center gap-5 w-full px-4 rounded-lg font-semibold border-zinc-800 text-white hover:bg-zinc-800"
                  >
                    <ShoppingCart className="h-5 w-5" /> {CardCoins.length}
                  </Button>
                </Link>
              <Button onClick={() => { handleLogout(); closeMenu(); }} className="text-sm font-medium text-red-500 hover:text-black">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Sign In</Link>
              <Link to="/register" onClick={closeMenu} className="text-sm font-medium text-zinc-400 hover:text-white">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


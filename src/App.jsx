import React from 'react'
import { HashRouter as Router , Routes , Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import MarketTrends from './pages/MarketTrends'
import SearchForm from './components/SearchForm'
import Header from './components/Header'
import SearchPage from './pages/SearchPage'
import CoinPage from './pages/CoinPage'
import CardPage from './pages/CardPage'
import Trade from './pages/Trade'
import Earn from './pages/Earn'
import NFTs from './pages/NFTs'
import Learn from './pages/Learn'

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Header />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/markets' element={<MarketTrends />} />
          <Route path='/trade' element={<Trade />} />
          <Route path='/earn' element={<Earn />} />
          <Route path='/nfts' element={<NFTs />} />
          <Route path='/learn' element={<Learn />} />
          <Route path='/search-form' element={<SearchForm />} />
          <Route path='/coin/search/:searchquery' element={<SearchPage />} />
          <Route path='/coin/:id' element={<CoinPage />} />
          <Route path='/coin-card' element={<CardPage />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
      <Footer />
      </div>
      <ToastContainer />
    </Router>
  )
}

export default App

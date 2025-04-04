import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { LoginUser } from '../features/Auth/AuthSlice'
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {

  const {Users , isLoading , isError , message} = useSelector(state => state.Auth)

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const {email , password} = formData

  const [formErrors , setFormErrors] = useState({
    email : "",
    password : ""
  })

  const [showPassword , setShowPassword] = useState(false)

  const validForm = () =>{
    let isValid = true
const newErorrs = {...formErrors}

// Valid Email
if(!email){
  newErorrs.email = "Email is Required!",
  isValid = false;
} else if(!/\S+@\S+\.\S+/.test(email)){
  newErorrs.email = "Email is InValid!",
  isValid = false
}

// Valid Password
if(!password){
  newErorrs.password = "Password is Required!",
  isValid = false
} else if(password.length < 6){
  newErorrs.password = "Password msut be at least 6 Characters",
  isValid = false
}

setFormErrors(newErorrs)
return isValid
  }

  const handleChange = (e) =>{
    setFormData({...formData , [e.target.name] : e.target.value})
    setFormErrors({...formErrors , [e.target.name] : ""})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(validForm()){

      setIsSubmitting(true);
    
      // Simulate login process
      setTimeout(() => {
        setIsSubmitting(false);
        // Add your actual login logic here
      }, 1500);

      dispatch(LoginUser(formData))
      .unwrap()
      .then(() =>{
        toast.success("Logged0-In Successful!")
        setFormData({email : "", password : ""})
      })
      .catch((error) => {
        if(error.includes("User Already Exists || Enter a Unique Number")){
          toast.error("User Not Logged-In")
        }else{
          toast.error(error || "Logged-In Failled!!")
        }
      })
    } else{
      const errorMessages = Object.values(formErrors).filter(msg => msg !== "")
      if(errorMessages.length > 0){
        toast.error(errorMessages[0])
      }
    }
  }

  // Simulated crypto data for background animation
  useEffect(() => {
    if(Users){
      navigate("/")
    }

    const mockCryptoData = [
      { name: 'BTC', value: '64,235' },
      { name: 'ETH', value: '3,452' },
      { name: 'SOL', value: '148' },
      { name: 'BNB', value: '542' },
      { name: 'DOT', value: '25' },
      { name: 'ADA', value: '0.43' },
      { name: 'XRP', value: '0.54' },
    ];
    setCryptoData(mockCryptoData);
  }, [Users]);


  if(isLoading){
    return <Loading />
  }
 

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Animated crypto background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {cryptoData.map((crypto, index) => (
          <motion.div
            key={crypto.name}
            className="absolute text-green-400 font-mono"
            initial={{ 
              x: Math.random() * 100, 
              y: -20, 
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              opacity: [0, 1, 0.8, 0],
              x: Math.random() * 100 + index * 200
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15 + Math.random() * 20,
              delay: index * 2
            }}
          >
            {crypto.name}: ${crypto.value}
          </motion.div>
        ))}
      </div>
      
      {/* Left side - Brand & Info */}
      <motion.div 
        className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Crypto Bazar
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg md:text-xl max-w-md"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your gateway to the world of digital assets. Trade, invest, and grow your portfolio with our secure platform.
          </motion.p>
        </div>
        
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Industry-leading security protocols</p>
          </div>
          <div className="flex items-center mb-6">
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>24/7 market access and monitoring</p>
          </div>
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Competitive transaction fees</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Right side - Login Form */}
      <motion.div 
        className="md:w-1/2 flex items-center justify-center p-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl p-8 w-full max-w-md border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {isError && message && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {message}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="Enter Your Email"
                />
                {formErrors.email && <p className='mt-1 text-xs text-red-500' >{formErrors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="••••••••"
                />
                {formErrors.password && <p className='mt-1 text-xs text-red-500' >{formErrors.password}</p>}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-green-500 border-gray-700 rounded bg-gray-900 focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-400 hover:text-green-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                isSubmitting ? "bg-gray-600" : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Sign in <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </motion.button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.a
                href="#"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4393 21.879V14.89H7.89931V12H10.4393V9.797C10.4393 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5613 9.333 13.5613 10.124V12H16.3363L15.8933 14.89H13.5613V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.283 9.521 21.021C9.521 20.785 9.513 20.135 9.508 19.285C6.726 19.866 6.139 17.896 6.139 17.896C5.684 16.747 5.029 16.45 5.029 16.45C4.147 15.816 5.098 15.829 5.098 15.829C6.082 15.899 6.626 16.863 6.626 16.863C7.5 18.353 8.969 17.944 9.539 17.691C9.631 17.041 9.889 16.633 10.175 16.419C7.955 16.202 5.62 15.351 5.62 11.611C5.62 10.522 6.016 9.636 6.646 8.946C6.54 8.694 6.189 7.715 6.746 6.291C6.746 6.291 7.566 6.028 9.496 7.371C10.295 7.151 11.155 7.041 12.005 7.037C12.855 7.041 13.715 7.151 14.515 7.371C16.444 6.028 17.261 6.291 17.261 6.291C17.821 7.715 17.47 8.694 17.364 8.946C17.996 9.636 18.389 10.522 18.389 11.611C18.389 15.362 16.051 16.199 13.822 16.411C14.178 16.673 14.499 17.192 14.499 17.984C14.499 19.158 14.487 20.692 14.487 21.021C14.487 21.286 14.666 21.587 15.176 21.485C19.147 20.159 22.005 16.414 22.005 12C22.005 6.477 17.528 2 12.005 2H12Z" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10h-10.4v3.85h5.93c-.25 1.36-1.02 2.53-2.19 3.3v2.74h3.54c2.08-1.92 3.27-4.74 3.27-8.09h-.01z" fill="#4285F4" />
                  <path d="M12.04 22c2.94 0 5.4-.96 7.19-2.6l-3.54-2.74c-.98.66-2.23 1.06-3.65 1.06-2.82 0-5.2-1.9-6.05-4.44H2.39v2.83c1.79 3.55 5.47 5.9 9.65 5.9z" fill="#34A853" />
                  <path d="M5.99 13.28c-.22-.66-.34-1.36-.34-2.09s.12-1.43.34-2.09V6.27H2.39C1.67 7.93 1.29 9.82 1.29 11.5s.38 3.57 1.1 5.23l3.6-3.45z" fill="#FBBC05" />
                  <path d="M12.04 5.18c1.59 0 3.02.55 4.14 1.62l3.13-3.13C17.45 2.09 14.97 1 12.04 1 7.86 1 4.18 3.34 2.39 6.91l3.6 2.8c.85-2.54 3.23-4.53 6.05-4.53z" fill="#EA4335" />
                </svg>
              </motion.a>
            </div>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-green-400 hover:text-green-300">
              Sign up now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
    </>
  )
}

export default LoginPage

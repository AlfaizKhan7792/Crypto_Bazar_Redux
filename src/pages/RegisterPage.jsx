import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../features/Auth/AuthSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, Mail, Eye, EyeOff, User, Phone } from 'lucide-react';

const RegisterPage = () => {

const {Users , isLoading} = useSelector(state => state.Auth)
const dispatch = useDispatch()
const navigate = useNavigate()

const [showPassword , setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [agreeTerms, setAgreeTerms] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [cryptoData, setCryptoData] = useState([]);
const [passwordStrength, setPasswordStrength] = useState(0);
const [passwordsMatch, setPasswordsMatch] = useState(true);

const [formData , setFormData] = useState({
  name : "",
  phone : "",
  email : "",
  password : "",
  confirmPassword : ""
})

const {name , phone , email , password , confirmPassword} = formData

const [formErrors , setFormErrors] = useState({
  name : "",
  phone : "",
  email : "",
  password : "",
  confirmPassword : ""
})

const handleChange = (e) =>{
  setFormData({...formData , [e.target.name] : e.target.value})
  setFormErrors({...formErrors , [e.target.name] : ""})

 // Check password strength
 if (name === 'password') {
  const strength = checkPasswordStrength(value);
  setPasswordStrength(strength);
}

// Check if passwords match
if (name === 'confirmPassword' || name === 'password') {
  if (name === 'confirmPassword') {
    setPasswordsMatch(value === formData.password);
  } else {
    setPasswordsMatch(value === formData.confirmPassword);
  }
}

}

// Function to check password strength
const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length > 6) score += 1;
  if (password.length > 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

// Get color for password strength indicator
const getStrengthColor = () => {
  if (passwordStrength <= 1) return 'bg-red-500';
  if (passwordStrength <= 3) return 'bg-yellow-500';
  return 'bg-green-500';
};

const validateForm = () =>{
  let isValid = true
  const newErrors = {...formErrors}

  // Validate Name
  if(!name.trim()){
    newErrors.name = "Name is Required!",
    isValid = false
  }

   // Validate phone number
   if (!phone) {
    newErrors.phone = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    newErrors.phone = "Phone number must be 10 digits";
    isValid = false;
  }
  
  // Validate email
  if (!email) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Email is invalid";
    isValid = false;
  }
  
  // Validate password
  if (!password) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }
  
  // Validate confirm password
  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
    isValid = false;
  }
  
  setFormErrors(newErrors);
  return isValid;
}

const handleSubmit = (e) =>{
  e.preventDefault()
  if(validateForm()){

    setIsSubmitting(true);
  
    // Simulate registration process
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);

    dispatch(RegisterUser(formData))
    .unwrap()
    .then(() =>{
      toast.success("Registration Successful!")
      setFormData({
        name : "",
  phone : "",
  email : "",
  password : "",
  confirmPassword : ""
      })
    })
    .catch((error) => {
      if(error.includes("User Already Exists || Enter a Unique Number")){
        toast.error("User Already Exists With this Email")
      }else{
        toast.error(error || "Registration Failed!")
      }
    })
  }else{
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
    { name: 'BTC', value: '64,235', change: '+2.4%' },
    { name: 'ETH', value: '3,452', change: '-0.7%' },
    { name: 'SOL', value: '148', change: '+5.2%' },
    { name: 'BNB', value: '542', change: '+1.1%' },
    { name: 'DOT', value: '25', change: '-2.3%' },
    { name: 'ADA', value: '0.43', change: '+0.8%' },
    { name: 'XRP', value: '0.54', change: '-1.5%' },
    { name: 'DOGE', value: '0.13', change: '+8.9%' },
    { name: 'AVAX', value: '87', change: '+3.2%' },
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
              x: Math.random() * 100 + index * 150
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15 + Math.random() * 20,
              delay: index * 1.5
            }}
          >
            {crypto.name}: ${crypto.value} <span className={crypto.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{crypto.change}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Left side - Login Form */}
      <motion.div 
        className="md:w-1/2 flex items-center justify-center p-4 md:p-8 order-2 md:order-1"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl p-6 md:p-8 w-full max-w-md border border-gray-700 shadow-xl">
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create Your Account
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
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
                  required
                  value={password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Password strength:</span>
                    <span className="text-xs text-gray-400">
                      {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border ${!passwordsMatch && formData.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-lg bg-gray-900 bg-opacity-50 focus:ring-green-500 focus:border-green-500 text-sm placeholder-gray-400`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  required
                  className="h-4 w-4 text-green-500 border-gray-700 rounded bg-gray-900 focus:ring-green-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the <a href="#" className="text-green-400 hover:text-green-300">Terms of Service</a> and <a href="#" className="text-green-400 hover:text-green-300">Privacy Policy</a>
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !passwordsMatch}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                isSubmitting || !passwordsMatch ? "bg-gray-600" : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
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
                  Create Account <ArrowRight size={16} className="ml-2" />
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
                <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
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
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-400 hover:text-green-300">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
      
      {/* Right side - Brand & Info */}
      <motion.div 
        className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center order-1 md:order-2"
        initial={{ x: 100, opacity: 0 }}
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
            Join thousands of traders and investors on the most innovative crypto platform.
          </motion.p>
        </div>
        
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
          >
            <div className="bg-green-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Quick and easy account setup</p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
          >
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Trade over 100 cryptocurrencies</p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
          >
            <div className="bg-purple-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Advanced security for your assets</p>
          </motion.div>
          <motion.div 
            className="flex items-center"
            whileHover={{ x: 5 }}
          >
            <div className="bg-yellow-500 rounded-full p-2 mr-4">
              <Check size={18} />
            </div>
            <p>Industry-leading customer support</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </>
  )
}

export default RegisterPage

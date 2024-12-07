import React, {useState} from 'react'
import ujirani from '../assets/ujirani.png'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const[focusedField, setFocusedField] = useState("null")
  return (
    // Main container
    <div className='relative font-poppins min-h-screen max-h-screen bg-black flex'>
        {/* Left logo Section */}
        <div className='w-1/3 text-white flex flex-col justify-center items-center p-10'>
        <img 
          src={ujirani}
          alt="Ujirani Logo"
          className='h-auto w-auto -mt-24 mb-6'
        />
        <p className='text-sm font-semibold text-center -mt-28 mb-28'>
            Connect with your neighbors!
        </p>
        {/* footer Section */}
        <footer className="mt-10 text-sm text-gray-500 text-center -mb-24 justify-center items-center ">
          <p className="mb-6">Help · Guidelines · Legal Policy</p>
          <p className="mb-6">About · Press · Blog</p>
          <p className="text-white">© 2024 ITR Business Solutions</p>
        </footer>
        </div>
        
        {/* Right Login Section */}
        
      <div className="w-full bg-white flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-2xl font-bold mb-3 text-green-600">
          Welcome Back to Ujirani
        </h1>
        <p className="text-base text-gray-400 mb-1">
          Log in to stay updated with your neighbourhood
        </p>
        

        {/*Form Section */}
        <div className="w-full max-w-md px-8 mt-10">
          <form className="space-y-5">
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 pl-4 border-2 border-gray-500 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-200"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 pl-4 border-2 border-gray-500 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-200"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <button className="w-full bg-green-600 text-white py-2.5 rounded-2xl font-bold hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg mt-2">
              Login
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500">
                or 
              </span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              <FcGoogle className="w-5 h-5 mr-3" />
              <span className="text-gray-600 font-medium">
                Continue with Google
              </span>
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6 mb-6">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
        </div>
    </div>
  )
}

export default Login

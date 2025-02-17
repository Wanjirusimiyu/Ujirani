import React, { useState } from "react";
import ujirani from "../assets/ujirani.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(value) ? "Please enter a valid email address." : "";
  };

  const validatePassword = (value) =>
    value.length < 6 ? "Password must be at least 6 characters." : "";

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (!emailError && !passwordError) {
      try {
        const response = await fetch('http://127.0.0.1:5555/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Login successful!");
          setTimeout(() => {
            navigate('/', { state: { user: data.user } });
          }, 1500);
        } else {
          setMessage(data.message || "Invalid email or password");
        }
      } catch (error) {
        console.log('Error details:', error);
        setMessage("Invalid credentials. Please check your email and password.");
      }
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const response = await fetch('http://localhost:5555/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenResponse.access_token })
      });
  
      const data = await response.json();
      // Store the JWT token received from your backend
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };
  

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setMessage("Google login failed. Please try again."),
  });

  return (
    <div className="relative font-poppins min-h-screen max-h-screen bg-black flex">
      <div className="w-1/3 text-white flex flex-col justify-center items-center p-10">
        <img
          src={ujirani}
          alt="Ujirani Logo"
          className="h-auto w-auto -mt-24 mb-6"
        />
        <p className="text-sm font-semibold text-center -mt-28 mb-28">
          Connect with your neighbors!
        </p>
        <footer className="mt-10 text-sm text-gray-500 text-center -mb-24 justify-center items-center ">
          <p className="mb-6">Help · Guidelines · Legal Policy</p>
          <p className="mb-6">About · Press · Blog</p>
          <p className="text-white">© 2024 ITR Business Solutions</p>
        </footer>
      </div>

      <div className="w-full bg-white flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-2xl font-bold mb-3 text-green-600">
          Welcome Back to Ujirani
        </h1>
        <p className="text-base text-gray-400 mb-1">
          Log in to stay updated with your neighbourhood.
        </p>

        <div className="w-full max-w-md px-8 mt-10">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {message && (
              <div className={`p-3 rounded-lg text-center ${
                message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {message}
              </div>
            )}

            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`w-full p-3 pl-4 border-2 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200 ${
                  touched.email && errors.email ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Enter your email"
                required
              />
              {touched.email && errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`w-full p-3 pl-4 border-2 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200 ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
                placeholder="Enter your password"
                required
              />
              {touched.password && errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2.5 rounded-2xl font-bold hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg mt-2"
            >
              LOGIN
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500">or</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <FcGoogle className="w-5 h-5 mr-3" />
              <span className="text-gray-600 font-medium">
                Continue with Google
              </span>
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6 mb-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import ujirani from "../assets/ujirani.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateName = (value) =>
    value.length < 6 ? "Please enter your full name." : "";

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(value)
      ? "Please enter a valid email address."
      : "";
  };

  const validatePassword = (value) =>
    value.length < 6 ? "Password must be at least 6 characters." : "";

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(name) }));
    } else if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ name: nameError, email: emailError, password: passwordError });
    setTouched({ name: true, email: true, password: true });

    if (!nameError && !emailError && !passwordError) {
      const userData = {
        fullname: name,
        email: email,
        password: password,
      };

      axios
        .post("http://127.0.0.1:5555/signup", userData)
        .then((response) => {
          setSuccessMessage("Account created successfully! You can now login.");
          setErrorMessage("");
          setName("");
          setEmail("");
          setPassword("");
          setTouched({});
          setErrors({});

          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(
              error.response.data.message || "An error occurred during signup"
            );
          } else if (error.request) {
            setErrorMessage("No response from server. Please try again.");
          } else {
            setErrorMessage("Error: " + error.message);
          }
          setSuccessMessage("");
        });
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      // Get the actual token from the response
      const response = await fetch('http://127.0.0.1:5555/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenResponse.access_token })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate');
      }
      
      const data = await response.json();
      
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate('/', { state: { user: data.user } });
      }, 1500);
    } catch (error) {
      console.error('Google auth error:', error);
      setErrorMessage("Failed to connect with Google. Please try again.");
    }
};

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setErrorMessage("Google sign up failed. Please try again."),
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
        <footer className="mt-10 text-sm text-gray-500 text-center -mb-24 justify-center items-center">
          <p className="mb-6">Help · Guidelines · Legal Policy</p>
          <p className="mb-6">About · Press · Blog</p>
          <p className="text-white">© 2024 ITR Business Solutions</p>
        </footer>
      </div>

      <div className="w-full bg-white flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-2xl font-bold mb-3 text-green-600">
          Join Ujirani - Connect with Your Neighbors!
        </h1>
        <p className="text-base text-gray-400 mb-1">
          Create an account to stay connected with your community, share local news and
        </p>
        <p className="text-base text-gray-400 mb-10">
          get involved in neighborhood activities.
        </p>

        <div className="w-full max-w-md px-8">
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`w-full p-3 pl-4 border-2 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200 ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
                placeholder="Enter your full name"
                required
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-medium text-green-600">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`w-full p-3 pl-4 border-2 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-500"
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
                placeholder="Create a strong password"
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
              SIGN UP
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
import React from "react";
import ujirani from "../assets/ujirani.png";

const SignUp = () => {
  return (
    // Main Container
    <div className="relative font-poppins min-h-screen max-h-screen bg-black flex">
      {/* Left logo Section */}
      <div className="w-1/3 text-white flex flex-col justify-center items-center p-10">
          <img src={ujirani} alt="Ujirani Logo" className="h-auto w-auto -mt-24 mb-6"/>
        <p className=" text-sm font-semibold text-center -mt-32 mb-28 ">
          Connect with your neighbors!
        </p>
        {/* footer Section */}
        <footer className="mt-10 text-sm text-gray-500 text-center -mb-12 justify-center items-center ">
          <p className="mb-6">Help · Guidelines · Legal Policy</p>
          <p className="mb-6">About · Press · Blog</p>
          <p className="text-white">© 2024 ITR Business Solutions</p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;

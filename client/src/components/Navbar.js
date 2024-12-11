import React from "react";
import { FaSearch} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between w-full">
      <header className="bg-white shadow p-4 w-full">
        <div className="container mx-auto flex justify-between items-center w-full">
          
          {/* Search bar container */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here"
              className="border bg-gray-300 rounded-full px-4 py-2 w-full pl-10"
            />
            {/* Search icon */}
            <FaSearch className="h-5 w-5 text-black absolute right-6 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        
        {/* Alert button and location section */}
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-800 transition-colors">
            Alerts
          </button>
          
          {/* Location verification section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-600">
              <FaLocationDot className="h-5 w-5 mr-2" />
              <span>Verify your location</span>
            </div>
            <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
              Office
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;


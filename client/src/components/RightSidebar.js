import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import reminder from "../assets/reminder.png";
import illustration from "../assets/Illustration.png";
import illustration2 from "../assets/Illustration2.png";

const RightSidebar = () => {
  return (
    <div className="w-full bg-gray-100 p-4 min-h-screen">
      {/* Profile Section */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="font-medium">Your Profile</h3>
            <p className="text-sm text-gray-500">View and edit profile</p>
          </div>
        </div>
      </div>

    {/* Advertisement Card */}
<div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
  <div className="flex flex-col mb-3">
    <div className="flex space-x-20 mb-4">
      <img
        src={illustration2}
        alt="illustration2"
        className="w-16 h-16 rounded-lg"
      />
      <img
        src={illustration}
        alt="illustration"
        className="w-16 h-16 rounded-lg"
      />
    </div>
    <h1 className="font-semibold text-black text-left">Become Our Jirani</h1>
    <p className="text-sm text-gray-400 text-left">
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
    </p>
  </div>
  <button className="bg-black text-white px-4 py-2 rounded-lg w-full">
    View Tips
  </button>
</div>



      {/* Reminder Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium mb-2">Reminders</h4>
        <div className="text-sm text-gray-600">
          <img
            src={reminder}
            alt="reminder.png"
            className="w-52 h-52 inline-block mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

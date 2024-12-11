import React from "react";
import { NavLink } from "react-router-dom";
import { PiChatCircleTextFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import ujirani from "../assets/ujirani.png";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "/", icon: <AiFillHome /> },
    { name: "Explore", path: "/explore", icon: <MdExplore /> },
    { name: "Sales", path: "/sales", icon: <FaChartBar /> },
    { name: "Chats", path: "/chats", icon: <PiChatCircleTextFill /> },
    { name: "Jirani", path: "/jirani", icon: <FaUserPlus /> },
    { name: "Settings", path: "/settings", icon: <IoMdSettings /> },
  ];

  return (
    <div className="bg-black w-1/4 font-poppins flex flex-col items-center justify-between px-6 py-8 min-h-screen">
      <img
        src={ujirani}
        alt="Ujirani logo"
        className="h-48 w-48 mb-2 -mt-10 object-contain -ml-32"
      />

      {/* Navigation Links */}
      <aside className="bg-black text-gray-400 flex-1 w-full -mr-10">
        <nav>
          <ul className="space-y-6">
            {links.map((link) => (
              <li
                key={link.name}
                className="flex font-semibold text-lg items-center mb-2"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-green-500 flex items-center gap-3"
                      : "flex items-center gap-3"
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Footer Section */}
      <footer className="text-sm text-gray-500 text-center">
        <p className="mb-4">Help · Guidelines · Legal Policy</p>
        <p className="mb-4">About · Press · Blog</p>
        <p className="text-white">© 2024 ITR Business Solutions</p>
      </footer>
    </div>
  );
};

export default Sidebar;

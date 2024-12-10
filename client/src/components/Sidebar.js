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
    <div className="bg-black w-1/4 font-poppins px-8">
      <img src={ujirani} alt="Ujirani logo" className="h-60 w-60 -mt-16 mb-4" />
      <aside className="bg-black text-gray-400 h-screen flex flex-col">
        <nav>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.name} className="flex font-semibold items-center">
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
          <footer className="mt-16 text-sm text-gray-500 text-center -mb-24 justify-center items-center">
            <p className="mb-6">Help · Guidelines · Legal Policy</p>
            <p className="mb-6">About · Press · Blog</p>
            <p className="text-white">© 2024 ITR Business Solutions</p>
          </footer>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
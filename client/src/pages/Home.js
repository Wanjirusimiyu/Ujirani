import React from "react";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  const posts = [
    {
      location: "Kasarani, Seasons",
      time: "10 minutes ago",
      content: "Does anyone know a good repair shop around? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      likes: "200k",
      comments: 646,
      shares: 30,
    },
    {
      location: "Kasarani, Seasons",
      time: "10 minutes ago",
      content: "Does anyone know a good repair shop around? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583413230888-c7b03057be03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      likes: "200k",
      comments: 646,
      shares: 30,
    },
  ];

  return (
    <div className="relative font-poppins h-screen overflow-hidden bg-black flex">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-3xl overflow-hidden flex">
        {/* Posts Section */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto px-8 mt-10">
            <div className="p-6 bg-gray-100">
              {posts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-1/3 bg-gray-100 p-4 min-h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};
export default Home;
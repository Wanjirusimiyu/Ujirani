import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow p-4 rounded-3xl" >
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ujirani</h1>
        <input
          type="text"
          placeholder="Search here"
          className="border rounded px-4 py-2 w-1/3"
        />
      </div>
    </header>
    </div>
  );
};

export default Navbar;


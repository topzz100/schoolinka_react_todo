import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar border-b border-gray-200">
      <div className="container mx-auto flex flex-row justify-between items-center px-2 lg:px-20 py-3">
        <h4 className="font-bold text-2xl">ToDo</h4>
        <ul className=" items-center space-x-5 hidden lg:flex">
          <li>
            <img src="/images/settings-01.png" alt="" />
          </li>
          <li>
            <img src="/images/bell-01.png" alt="" />
          </li>
          <li>
            <img
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
          </li>
        </ul>
        <img className="lg:hidden" src="/images/menu-02.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;

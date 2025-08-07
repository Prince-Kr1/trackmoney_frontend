import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = () => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-primary border-b border-gray-200/50 shadow-md backdrop-blur-[2px] py-3 px-7 sticky top-0 z-50">
        <button
            className="block lg:hidden text-white"
            onClick={() => {setOpenSideMenu(!openSideMenu)}}
        >
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
               <HiOutlineMenu className="text-2xl" />
            )}
        </button>

        <h2 className="text-2xl font-medium text-white">TrackMoney</h2>

        {openSideMenu && (
            <div className="fixed top-[56px] left-0 z-40 border-t border-gray-200/50 animate-slideFadeIn">
                <SideMenu />
            </div>    
        )}
    </div>
  )
}

export default Navbar;
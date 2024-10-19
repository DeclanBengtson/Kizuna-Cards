'use client'; // Add this directive at the top of the file

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navigationIcon from '../../public/Images/navigation.png'; // Adjust the path as needed
import Subscriptions from './subscription'; // Import the Subscriptions modal component

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close the dropdown menu when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600 && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">Couples Questions</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/Browser" className="btn btn-ghost">Browser</Link></li>
            <li><Link href="/login" className="btn btn-ghost">Login</Link></li>
            <li><button className="btn btn-ghost" onClick={openModal}>Premium</button></li>
          </ul>
        </div>
        <div className="navbar-end lg:hidden">
          <button className="btn btn-ghost btn-circle" onClick={toggleDropdown}>
            <Image src={navigationIcon} alt="Menu" width={30} height={30} />
          </button>
        </div>
        {isDropdownOpen && (
          <div className="navbar-dropdown lg:hidden">
            <ul className="menu menu-vertical bg-base-100 w-full p-2 shadow-lg">
              <li><Link href="/Browser" className="btn btn-ghost">Browser</Link></li>
              <li><Link href="/Login" className="btn btn-ghost">Login</Link></li>
              <li><button className="btn btn-ghost" onClick={openModal}>Premium</button></li>
            </ul>
          </div>
        )}
      </nav>
      {isModalOpen && <Subscriptions onClose={closeModal} />}
    </>
  );
}
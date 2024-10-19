'use client';

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
      <nav className="navbar bg-base-100 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Couples Questions</Link>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/myo" className="btn btn-ghost">MYO</Link></li>
              <li><Link href="/browse" className="btn btn-ghost">Browse</Link></li>
              <li><Link href="/login" className="btn btn-ghost">Login</Link></li>
              <li><button className="btn btn-ghost" onClick={openModal}>Premium</button></li>
            </ul>
          </div>
          <div className="lg:hidden">
            <button className="btn btn-ghost btn-circle" onClick={toggleDropdown}>
              <Image src={navigationIcon} alt="Menu" width={30} height={30} />
            </button>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-base-100 shadow-lg lg:hidden">
            <ul className="menu menu-vertical w-full p-2">
              <li><Link href="/myo" className="btn btn-ghost">MYO</Link></li>
              <li><Link href="/browse" className="btn btn-ghost">Browse</Link></li>
              <li><Link href="/login" className="btn btn-ghost">Login</Link></li>
              <li><button className="btn btn-ghost" onClick={openModal}>Premium</button></li>
            </ul>
          </div>
        )}
      </nav>
      {isModalOpen && <Subscriptions onClose={closeModal} />}
    </>
  );
}
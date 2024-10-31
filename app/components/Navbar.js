'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navigationIcon from '../../public/Images/navigation.png';
import Subscriptions from './subscriptions/subscription';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle navigation item clicks
  const handleNavClick = () => {
    setIsDropdownOpen(false);
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

  // Create a NavLink component to handle both Link and click behavior
  const NavLink = ({ href, children, className = "btn btn-ghost" }) => (
    <Link href={href} className={className} onClick={handleNavClick}>
      {children}
    </Link>
  );

  return (
    <>
      <nav className="navbar bg-base-100 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex-1">
            <NavLink href="/" className="btn btn-ghost normal-case text-xl">
              Couples Questions
            </NavLink>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><NavLink href="/collections">Collections</NavLink></li>
              <li><NavLink href="/browse">Browse</NavLink></li>
              <li><NavLink href="/login">Login</NavLink></li>
              <li>
                <button className="btn bg-black text-white" onClick={openModal}>
                  Get Premium
                </button>
              </li>
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
              <li><NavLink href="/collections">Collections</NavLink></li>
              <li><NavLink href="/browse">Browse</NavLink></li>
              <li><NavLink href="/login">Login</NavLink></li>
              <li>
                <button className="btn bg-black text-white" onClick={openModal}>
                  Get Premium
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      {isModalOpen && <Subscriptions onClose={closeModal} />}
    </>
  );
}
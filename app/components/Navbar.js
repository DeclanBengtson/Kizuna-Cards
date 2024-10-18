"use client"; // Add this directive at the top of the file

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Navbar.css';
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
      <nav className="navbar">
        <Link href="/" className="navbar-logo">Couples Questions</Link>
        <div className="navbar-links">
          <Link href="/Browser" className="navbar-icon">Browser</Link>
          <Link href="/login" className="navbar-icon">Login</Link>
          <button className="navbar-icon" onClick={openModal}>Premium</button>
        </div>
        <div className="navbar-menu-icon" onClick={toggleDropdown}>
          <Image src={navigationIcon} alt="Menu" width={30} height={30} />
        </div>
        {isDropdownOpen && (
          <div className="navbar-dropdown">
            <Link href="/Browser" className="navbar-dropdown-link">Browser</Link>
            <Link href="/Login" className="navbar-dropdown-link">Login</Link>
            <button className="navbar-dropdown-link" onClick={openModal}>Premium</button>
          </div>
        )}
      </nav>
      {isModalOpen && <Subscriptions onClose={closeModal} />}
    </>
  );
}
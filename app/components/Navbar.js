"use client"; // Add this directive at the top of the file

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import './Navbar.css';
import navigationIcon from '../../public/Images/navigation.png'; // Adjust the path as needed

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">Couples Questions</Link>
      <div className="navbar-links">
        <Link href="/Browser" className="navbar-icon">Browser</Link>
        <Link href="/Login" className="navbar-icon">Login</Link>
        <Link href="/Subscription" className="navbar-icon">Premium</Link>
      </div>
      <div className="navbar-menu-icon" onClick={toggleDropdown}>
        <Image src={navigationIcon} alt="Menu" width={30} height={30} />
      </div>
      {isDropdownOpen && (
        <div className="navbar-dropdown">
          <Link href="/Browser" className="navbar-dropdown-link">Browser</Link>
          <Link href="/Login" className="navbar-dropdown-link">Login</Link>
          <Link href="/Subscription" className="navbar-dropdown-link">Premium</Link>
        </div>
      )}
    </nav>
  );
}
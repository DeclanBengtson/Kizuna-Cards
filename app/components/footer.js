// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</span>
        </div>
        <div className="flex space-x-4">
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
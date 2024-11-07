"use client";

import 'tailwindcss/tailwind.css';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8 pt-24">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to our website. By accessing or using this site, you agree to comply with and be bound by the following terms and conditions.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Use of the Site</h2>
        <p className="mb-4">
          You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Intellectual Property</h2>
        <p className="mb-4">
          All content on this site is the property of our company and is protected by intellectual property laws.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          We will not be liable for any damages arising from the use of this site.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may revise these terms at any time by updating this page. Please check this page regularly to ensure you are aware of any changes.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
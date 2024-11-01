"use client";

import 'tailwindcss/tailwind.css';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This privacy policy explains what personal data we collect from you and how we use it.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We collect information to provide better services to our users. This includes information you provide to us directly and information we collect automatically.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">How We Use Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our users.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Sharing Information</h2>
        <p className="mb-4">
          We do not share personal information with companies, organizations, or individuals outside of our organization unless one of the following circumstances applies:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>With your consent</li>
          <li>For external processing</li>
          <li>For legal reasons</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. You can do this by contacting us at any time.
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Changes to This Policy</h2>
        <p className="mb-4">
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
        
        <p className="mb-4">
          If you have any questions about this privacy policy, please contact us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
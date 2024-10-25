"use client"; // Ensure this page is a client component

import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Recovery email sent. Please check your inbox.');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" onSubmit={handleRecover}>
        <h2 className="text-2xl font-bold text-center">Recover Password</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Send Recovery Email</button>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default RecoverPasswordPage;
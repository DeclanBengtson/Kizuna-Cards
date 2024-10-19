"use client"; // Ensure this page is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Store the token in localStorage or cookies
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center">Login</h2>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <p className="text-center">
          Don&apos;t have an account? <a href="/signup" className="link link-primary">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
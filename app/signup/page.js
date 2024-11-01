"use client"; // Ensure this page is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';
import VerticalCardAnimation from '../components/Signup/VerticalCardAnimation'; // Import the new component

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side for signup form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white">
        <form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg" onSubmit={handleSignup}>
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
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
          <button type="submit" className="btn w-full bg-black text-white">Sign Up</button>
          <div className="flex justify-between items-center">
            <p className="text-left">Already have an account?</p>
            <a href="/login" className="btn bg-black text-white">Login</a>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left">Forgot your password?</p>
            <a href="/recover-password" className="btn bg-black text-white">Recover it here</a>
          </div>
        </form>
      </div>

      {/* Right side for additional content */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-100">
        <VerticalCardAnimation /> {/* Use the VerticalCardAnimation component here */}
      </div>
    </div>
  );
};

export default SignupPage;
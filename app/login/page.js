"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

// Import the CardScroll component
import LoginScroll from '../components/Login/loginscroll';  // Adjust the path as necessary

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/collections');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side for login form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white">
        <form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
          <button type="submit" className="btn w-full bg-black text-white">Login</button>
          <div className="flex justify-between items-center">
            <p className="text-left">Don&apos;t have an account?</p>
            <a href="/signup" className="btn bg-black text-white">Sign up</a>
          </div>
        </form>
      </div>

      {/* Right side for CardScroll component */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-100">
        <LoginScroll />
      </div>
    </div>
  );
};

export default LoginPage;
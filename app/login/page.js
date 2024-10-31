"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

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
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side for login form */}
      <div className="flex items-center justify-center w-1/2 bg-white">
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
          <button type="submit" className="btn btn-primary w-full">Login</button>
          <p className="text-center">
            Don&apos;t have an account? <a href="/signup" className="link link-primary">Sign up</a>
          </p>
        </form>
      </div>

      {/* Right side for additional component */}
      <div className="w-1/2 flex items-center justify-center bg-blue-100">
        {/* Add your additional component here */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome to Our Service</h2>
          <p>Here you can add any content or components you like.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
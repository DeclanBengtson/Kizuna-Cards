"use client"; // Ensure this page is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'; // Import the CSS file

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
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don&apos;t have an account? <a href="/signup" className="link">Sign up</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
"use client"; // Ensure this page is a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import './login.css'; // Import the CSS file

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Ensure router is defined
    if (!router || !router.isReady) return;

    // Example: Redirect if user is already logged in
    const isLoggedIn = false; // Replace with actual login check
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Redirect to home page after login
    router.push('/');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
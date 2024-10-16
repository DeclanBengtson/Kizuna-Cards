"use client"; // Ensure this page is a client component

import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure router is defined
    if (!router || !router.isReady) return;

    // Example: Redirect if user is already logged in
    const isLoggedIn = false; // Replace with actual login check
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>Login</h1>
      <p>Don&apos;t have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default LoginPage;
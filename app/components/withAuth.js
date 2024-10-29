'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (status === 'unauthenticated' || !session?.user?.hasAccess) {
      // Redirect to home page if no access
      router.push('/premium');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    // You can return a loading indicator here if you want
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !session?.user?.hasAccess) {
    // Optionally render nothing or a message
    return null;
  }

  return children;
};

export default WithAuth;
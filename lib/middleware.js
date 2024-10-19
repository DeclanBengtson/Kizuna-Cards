// lib/authMiddleware.js

import { getSession } from 'next-auth/react';

export async function authMiddleware(req, res, next) {
  const session = await getSession({ req });

  if (!session) {
    // Redirect to login if not authenticated
    return res.redirect('/login');
  }

  // Check if user has access
  if (!session.user.hasAccess) {
    // Redirect to a subscription page or show a component
    return res.redirect('/subscribe');
  }

  // User has access, proceed to the page
  next();
}
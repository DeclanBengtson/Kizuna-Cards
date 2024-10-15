// app/components/Navbar.js
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">Couples Questions</Link>
      <div className="navbar-links">
        <Link href="/Browser" className="navbar-icon">Browser</Link>
        <Link href="/login" className="navbar-icon">Login</Link>
        <Link href="/Subscription" className="navbar-icon">Premium</Link>
      </div>
    </nav>
  );
}
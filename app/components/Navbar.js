// app/components/Navbar.js
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/friends">Friends</Link></li>
        <li><Link href="/lovers">Lovers</Link></li>
        <li><Link href="/subscriptions">Subscriptions</Link></li>
        <li><Link href="/success">Success</Link></li>
        <li><Link href="/cancel">Cancel</Link></li>
        <li><Link href="/browser">Browser</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/married">Married</Link></li>
      </ul>
    </nav>
  );
}
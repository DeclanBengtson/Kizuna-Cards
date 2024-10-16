import './styles/globals.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Navbar />
          <div className="App">
            {children}
          </div>
      </body>
    </html>
  );
}
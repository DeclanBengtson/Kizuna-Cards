import './styles/globals.css';
import Navbar from './components/Navbar';

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
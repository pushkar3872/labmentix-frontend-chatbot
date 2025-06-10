import '../styles/globals.css';
import Nav from '../components/Nav';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Nav />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000, // 3 seconds
        }}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
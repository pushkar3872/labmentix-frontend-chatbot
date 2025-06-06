// pages/_app.js
import '../styles/globals.css';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;

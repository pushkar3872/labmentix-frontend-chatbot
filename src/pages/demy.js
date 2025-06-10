import { useState } from 'react';

export default function Demo() {
  const [mymsg, setMymsg] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!mymsg.trim()) {
      setError('Please enter a message');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/callapi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mymsg }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data || { message: 'No response from backend.' });
      setMymsg(''); // Clear input after sending
    } catch (err) {
      setError('Failed to send message: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md text-black">
      <h3 className="text-2xl font-bold mb-6">Hello from the frontend</h3>
      
      <div className="mb-6">
        <input
          type="text"
          value={mymsg}
          onChange={(e) => setMymsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 text-lg"
          disabled={loading}
        />
      </div>

      <button 
        onClick={sendMessage} 
        disabled={loading || !mymsg.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {response && response.reply && (
        <div className="mt-8 p-5 bg-green-50 border border-green-300 rounded-md max-h-96 overflow-auto">
          <p className="text-lg font-semibold mb-3">Reply:</p>
          <div className="text-base whitespace-pre-wrap">{response.reply}</div>
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md">
          <p className="text-red-700 text-base">{error}</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

export default function ChatHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch chat history from your backend API
    fetch("http://localhost:5003/getchathistory")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch chat history");
        return res.json();
      })
      .then((data) => setHistory(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h3>Chat History</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {history.map((msg) => (
          <li key={msg.id || msg._id}>
            <strong>{msg.type}:</strong> {msg.content}
            <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
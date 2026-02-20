import { useState, useEffect } from 'react';
import axios from 'axios';
import ElectricBorder from './ElectricBorder.jsx';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_URL}/guestbook`);
      
      console.log("🔍 Backend sent this:", res.data); 
      
      // Safety check: Only set entries if it's a real array
      if (Array.isArray(res.data)) {
        setEntries(res.data);
      } else {
        console.error("🚨 Expected an array, but got:", res.data);
        setEntries([]); // Fallback to an empty array so the page doesn't crash
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => { fetchEntries(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    try {
      await axios.post(`${API_URL}/guestbook`, { name, message });
      setName(''); setMessage(''); fetchEntries();
    } catch (error) { console.error('Error posting:', error); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/guestbook/${id}`);
      fetchEntries();
    } catch (error) { console.error('Error deleting:', error); }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/guestbook/${id}`, { message: editMessage });
      setEditingId(null); fetchEntries();
    } catch (error) { console.error('Error updating:', error); }
  };

  return (
    <div className="container">
      {/* Wrap everything in the ElectricBorder */}
      <ElectricBorder color="#7df9ff" speed={1} chaos={0.12} borderRadius={16}>
        <div className="card-content">
          
          <div className="profile">
            <h1 style={{ color: '#7df9ff' }}>Welcome to Gab's Profile</h1>
            <p>Hi, I'm a 2nd-year BSCS student and a massive tech & aviation geek.</p>
            <p>When I'm not building full-stack apps or IoT devices, you can find me playing the drums or listening to Coldplay. Drop a message in my guestbook!</p>
          </div>

          <div className="guestbook-form">
            <h3>Sign the Guestbook</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <button type="submit">Post Message</button>
            </form>
          </div>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #334155' }} />

          <div className="guestbook-list">
            <h3>Messages</h3>
            {entries.length === 0 && <p style={{ color: '#94a3b8' }}>No messages yet. Be the first!</p>}
            {entries.map((entry) => (
              <div key={entry.id} className="guest-entry">
                <div className="entry-header">
                  <span>{entry.name}</span>
                </div>

                {editingId === entry.id ? (
                  <div className="edit-mode">
                    <textarea value={editMessage} onChange={(e) => setEditMessage(e.target.value)} style={{ marginBottom: '10px' }} />
                    <br />
                    <button onClick={() => saveEdit(entry.id)}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#64748b', marginLeft: '10px' }}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <p style={{ margin: '0 0 1rem 0' }}>{entry.message}</p>
                    <div className="actions">
                      <button className="edit" onClick={() => { setEditingId(entry.id); setEditMessage(entry.message); }}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(entry.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>
      </ElectricBorder>
    </div>
  );
}

export default App;
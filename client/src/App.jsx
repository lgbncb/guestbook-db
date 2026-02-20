import { useState, useEffect } from 'react';
import axios from 'axios';
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
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    try {
      await axios.post(`${API_URL}/guestbook`, { name, message });
      setName('');
      setMessage('');
      fetchEntries();
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/guestbook/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/guestbook/${id}`, { message: editMessage });
      setEditingId(null);
      fetchEntries();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className="container">
      <div className="profile">
        <h1>Welcome to Gab's Profile</h1>
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
            <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="submit">Post Message</button>
        </form>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

      <div className="guestbook-list">
        <h3>Messages</h3>
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
                <button onClick={() => setEditingId(null)} style={{ background: '#94a3b8', marginLeft: '10px' }}>Cancel</button>
              </div>
            ) : (
              <>
                <p>{entry.message}</p>
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
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ id: 0,name: '', email: '' });
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const Submit = (e) => {
    e.preventDefault();
    const data = { id, name, email };
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  const userSelect = event => {
    const userId = parseInt(event.target.value);
    setSelectedUser(users.find(user => user.id === userId));
  };

  

  
  return (
    <div className="container">
      <div className="select-container">
        <select onChange={userSelect}>
          <option value="">Select</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </select>
        {selectedUser && (
          <div className="user-container">
            <h2>User Details:</h2>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
        )}
      </div>
      <div className="form-container">
        <h2>Create a User:</h2>
        <form onSubmit={Submit}>
        <label>ID:</label>
          <input type="number" id="id" value={id} onChange={(event) => setId(event.target.value)} required />
          <label>Name:</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
          <label>Email:</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button type="submit">Create</button>
        </form>
      </div>
      
      <div className="card-container">
        {users.map(user => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

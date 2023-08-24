import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ListPage() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const result = await axios.get('http://localhost:3000/users');
        setUsers(result.data);
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      async function fetchData() {
        const result = await axios.get('http://localhost:3000/users');
        setUsers(result.data);
      }
      fetchData();
    }, [users]);;
  
  
    
   
  
    return (
      <div className="list-page">
        <h1 className="page-title">Liste des utilisateurs</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  export default ListPage;
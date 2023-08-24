import React, { useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function AddItemPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
    const handleSubmit = async event => {
      event.preventDefault();
    
      const newItem = { id: uuidv4(), name, email };
      try {
        const result = await axios.post('http://localhost:3000/users', newItem);
        console.log(result.data);
        setName('');
        setEmail('');
        setShowSuccessMessage(true);
      } catch (error) {
        console.log(error);
      }
    };
    
  
  
    return (
      <div className="add-item-page">
        <h1 className="page-title">Ajouter un utilisateur</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name='name'
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
        {showSuccessMessage && (
          <div className="success-message">
            L'élément a été ajouté avec succès..
          </div>
        )}
      </div>
    );
  }

  export default AddItemPage;
import React from 'react';
import { MouseKey } from 'postmk';


import AddItemPage from './Compo/AddItemPage'
import ListPage from './Compo/ListPage'





function App() {
  MouseKey()
  return (
    <div className="container">
      <ListPage />
      <AddItemPage />
    </div>
  );
}

export default App

import React from 'react';
import './App.css';
import RoutesApp from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>  
      <RoutesApp/>
      <ToastContainer
position="top-right"
autoClose={2000}
theme="light"
limit={1}
/>
    </>
  );
}

export default App;

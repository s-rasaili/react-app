import { useState } from 'react';
import { Navbar } from './assets/navbar/navbar.jsx';
import { HeroComponent } from './assets/HeroComponent/HeroComponent.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <HeroComponent />
    </div>
  );
}

export default App

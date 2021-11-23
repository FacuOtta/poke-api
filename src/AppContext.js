import './App.scss';
import PokemonList from './components/PokemonList'
import pokeLogo from './img/pokelogo.png'
import Colors from  './components/Colors'
import ColorsContext from './contexts/ColorsContext';
import { useState } from 'react';

function AppContext() {  

  const [currentColor, setCurrentColor] = useState("")

  const changeColor = (color) => {
    if (color === "blue") {
      setCurrentColor(color)  
    }else if (color === "yellow") {
      setCurrentColor(color)
    }else if (color === "green") {
      setCurrentColor(color)
    }else {
      setCurrentColor(color)
    }        
  }
  return (
    <ColorsContext.Provider value={{
      currentColor,
      changeColor
    }}>
      <header><img className='logo' src={pokeLogo} alt="logo" /></header>
      <main>
        <section className='poke-list-section'>
          <Colors />
        </section>
      </main>          
    </ColorsContext.Provider>
  );
}

export default AppContext;

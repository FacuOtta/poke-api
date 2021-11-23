import './App.scss';
import PokemonList from './components/PokemonList'
import pokeLogo from './img/pokelogo.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LanguageContext from "./contexts/LanguageContext"
import { useState } from 'react';

function App() {  

  const [currentLanguage, setCurrentLanguage] = useState('en')
 
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage: currentLanguage, 
      changeLanguage: changeLanguage
    }}>
      <header><img className='logo' src={pokeLogo} alt="logo" /></header>
      <main>
        <section className='poke-list-section'>
          <PokemonList/>
        </section>
      </main>          
    </LanguageContext.Provider>
  );
}

export default App;

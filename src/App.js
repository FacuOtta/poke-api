import './App.scss';
import PokemonList from './components/PokemonList'
import pokeLogo from './img/pokelogo.png'

function App() {  
  return (
    <div>
      <header><img className='logo' src={pokeLogo} alt="logo" /></header>
      <main>
        <section className='poke-list-section'>
          <PokemonList/>
        </section>
      </main>          
    </div>
  );
}

export default App;

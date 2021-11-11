import { useState } from 'react'
import { useEffect } from 'react'
import { fetchPokemons, createPokemon, updatePokemon, deletePokemon } from '../api/PokemonApi'
import createIcon from '../img/plus_circle_icon.png'
import Pokemon from './Pokemon'
import '../css/PokemonList.scss'

const PokemonList = () => {
  
  const [pokemonList, setPokemonList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [mainMove, setMainMove] = useState('')

  const [nameErr, setNameErr] = useState('')
  const [imageErr, setImageErr] = useState('')
  const [mainMoveErr, setMainMoveErr] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const [backendError, setBackendError] = useState(null)

  useEffect(() => {
    refreshPokemonList()
  }, [])

  const refreshPokemonList = () => {
    fetchPokemons().then(pokemons => setPokemonList(pokemons))
  }

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else if (e.target.name === 'image') {
      setImage(e.target.value)
    } else if (e.target.name === 'mainMove') {
      setMainMove(e.target.value)
    }
  }

  const isValidForm = () => {
    if (name.length < 3) {
      setNameErr('Name should have 3 or more characters')
      return false
    }
    else if (name.length > 20) {
      setNameErr('Name should have 20 or less characters')
      return false
    }
    else setNameErr('')

    if (image.length < 3) {
      setImageErr('Image should have 3 or more characters')
      return false
    } else if (image.length > 500) {
      setImageErr('Name should have 500 or less characters')
      return false
    }
    else setImageErr('')

    if (mainMove.length < 3) {
      setMainMoveErr('Main Move should have 3 or more characters')
      return false
    } else if (mainMove.length > 500) {
      setMainMoveErr('Main Move should have 50 or less characters')
      return false
    }
    else setMainMoveErr('')

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isValidForm()){
      if (editingId) {
        updatePokemon(editingId, { name, image, mainMove })
          .then(() => {
            setEditingId(null)
            setShowForm(false)
            refreshPokemonList()
            setBackendError(null)
          }).catch(err => {
            setBackendError('Failed Pokemon update')
            console.log(err.message)
          })
      } else {
        createPokemon({ name, image, mainMove })
          .then(() => {
            setShowForm(false)
            refreshPokemonList()
            setBackendError(null)
          }).catch(err => {
            setBackendError('Failed Pokemon creation')
            console.log(err.message)
          })
      }
    }
  }

  const setEditMode = (pokemon) => {
    setShowForm(true)
    setName(pokemon.name)
    setImage(pokemon.image)
    setMainMove(pokemon.mainMove)
    setEditingId(pokemon.id)
    cancelDelete()
  }

  const setCreationMode = () => {
    setShowForm(true)
    cleanForm()
    cancelDelete()
  }

  const cancelForm = () => {
    setShowForm(false)
    cleanForm()
  }

  const cleanForm = () => {
    setName('')
    setImage('')
    setMainMove('')
    setEditingId(null)
  }

  const confirmDelete = (pokemon) => {
    setDeletingId(pokemon.id)
  }

  const performDelete = () => {
    deletePokemon(deletingId).then(() => {
      refreshPokemonList()
      setDeletingId(null)
      setBackendError(null)
    }).catch(err => {
      setBackendError('Failed to delete pokemon')
      console.log(err.message)
    })
  }

  const cancelDelete = () => {
    setDeletingId(null)
  }

  return(
    <div className="pokemon-list-container">
      {!showForm && 
        <div>
          <div className="actions">
            <img src={createIcon} alt="create" onClick={setCreationMode} />
          </div>  
          <ul className='poke-list'>
            {pokemonList.length > 0 && pokemonList.map((pokemon) => {
              return <Pokemon pokemon={pokemon} 
                        setEditMode={setEditMode} 
                        confirmDelete={confirmDelete} 
                        performDelete={performDelete} 
                        cancelDelete={cancelDelete} 
                        deletingId={deletingId}
                        backendError={backendError} />
            })}  
          </ul>  
        </div>
      }

      {showForm && 
        <div className="form-container">
          {backendError && <div className="error">{backendError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={handleChange} value={name} />
              {nameErr && <div>{nameErr}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="image">Link to Image</label>
              <input type="text" id="image" name="image" onChange={handleChange} value={image} />
              {imageErr && <div>{imageErr}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="mainMove">Main Move</label>
              <input type="text" id="mainMove" name="mainMove" onChange={handleChange} value={mainMove} />
              {mainMoveErr && <div>{mainMoveErr}</div>}
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={cancelForm}>Cancel</button>
          </form>
        </div>
      }
    </div>
    
  )
}
export default PokemonList
export const fetchPokemons = async () => {
  const response = await fetch('http://localhost:8081/pokemons')
  const data = await response.json()
  return data
}

export const deletePokemon = async (id) => {
  const response = await fetch(`http://localhost:8081/pokemons/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}

export const createPokemon = async (pokemon) => {
  const response = await fetch('http://localhost:8081/pokemons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: pokemon.name,
      image: pokemon.image,
      mainMove: pokemon.mainMove
    })
  })
  const data = await response.json()
  return data
}

export const updatePokemon = async (id, pokemon) => {
  const dataFormat = {
    name: pokemon.name,
    image: pokemon.image,
    mainMove: pokemon.mainMove
  }
  const response = await fetch(`http://localhost:8081/pokemons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataFormat)
  })
  const data = await response.json()
  return data
}





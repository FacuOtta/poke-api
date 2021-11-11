import editIcon from '../img/edit_icon.png'
import deleteIcon from '../img/trash_icon.png'
import '../css/Pokemon.scss'

const Pokemon = ({ pokemon, setEditMode, confirmDelete, performDelete, cancelDelete, deletingId, backendError }) => {
  return (
    <li key={pokemon.name} className='pokemon'>
      {pokemon.id === deletingId && <div className="delete">
        <div>Are you sure you want to delete {pokemon.name}?</div>
        <div className="actions">
          <button onClick={performDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>

        {backendError && <div className="error">{backendError}</div>}
      </div>}
      {pokemon.id !== deletingId &&
        <div>
          <div>{pokemon.name}</div>
          <div className="actions">
            <span><img src={editIcon} alt="edit" onClick={() => setEditMode(pokemon)} /></span>
            <span><img src={deleteIcon} alt="delete" onClick={() => confirmDelete(pokemon)} /></span>
          </div>
          <div>
            <img className='avatar' src={pokemon.image} alt={pokemon.name}/>
          </div>
          <div className="desc">
            <span className="title">Main Move:</span>
            <div>
              {pokemon.mainMove}
            </div>
          </div>
        </div>
      }
    </li>
  )
}

export default Pokemon
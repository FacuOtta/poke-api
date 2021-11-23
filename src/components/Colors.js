import { useContext } from "react"
import ColorsContext from "../contexts/ColorsContext"


const Colors = () => {

  const colorsContext = useContext(ColorsContext)

  return <div>
    <h1>Colors</h1>

    <button onClick={() => colorsContext.changeColor('blue')}>Blue</button>
    <button onClick={() => colorsContext.changeColor('yellow')}>Yellow</button>
    <button onClick={() => colorsContext.changeColor('green')}>Green</button>
    <button onClick={() => colorsContext.changeColor('red')}>Red</button>
    
    <br /> 

    <div>Color elegido: {colorsContext.currentColor}</div>

    {/* <ol>
      <li>Crear el ColorsContext</li>
      <li>Cuando clickees cualquier boton tenes que setear en el Context cual es el color elegido y quiero que lo muestres en esta misma vista</li>
    </ol> */}
  </div>
}

export default Colors
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
      <Routes>
        { /*<div className="App"> */}
        { /*ciaomondo*/ }
        <Route path="/login" element={ <p>Ciao</p> } />
        { /*</div>*/ }
      </Routes>
  )
}

export default App

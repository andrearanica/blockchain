import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar.js'
import { Dashboard } from './components/Dashboard.js'
import { Login } from './components/Login.js'
import './App.css'

function App() {
  return (
      <>
      <Navbar />
      <Routes>
        { /*<div className="App"> */}
        { /*ciaomondo*/ }
        <Route path="/login"     element={ <Login /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="*" element={ <h4 class="container my-5 text-center">⚙️ 404 | Pagina non trovata</h4> } />
        { /*</div>*/ }
      </Routes>
      </>
  )
}

export default App

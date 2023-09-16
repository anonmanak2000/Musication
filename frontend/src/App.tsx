import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Register from './pages/Register'
function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to='/register?state=registerEmail' />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App

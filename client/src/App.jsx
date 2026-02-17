import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { RoutesReturn } from './routes/routesReturn'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<RoutesReturn />} />
      </Routes>
    </Router>
  )
}

export default App


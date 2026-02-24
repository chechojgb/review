import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GreetingsGame from './components/SkyController'
import WarmUp from './components/WarmUp'
import MagicAnimalBox from './components/MemoryGlitch'
import UnitReview from './components/UnitReview'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<GreetingsGame />} />
          <Route path="/warm-up" element={<MagicAnimalBox />} />
          <Route path="/unit-review" element={<UnitReview />} />
        </Routes>
        
      {/* </Layout> */}
    </Router>
    
  )
}

export default App

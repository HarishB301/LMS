
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact.'
import Faculty from './pages/Faculty'
import Course from './pages/Course'
function App() {
 

  return (
   
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/faculty' element={<Faculty/>}></Route>
        <Route path='/courses' element={<Course/>}></Route>
      </Routes>

  )
}

export default App

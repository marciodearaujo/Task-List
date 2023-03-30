import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Details from "./pages/Details"
import './globalstyles.css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact={true} element={<Home/>}/>
          <Route path='/Details/:id' element={<Details/>}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;

import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Loggin';
import Register from './pages/Register';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './pages/MyOrder';


function App() {
  return (
    <CartProvider>
        <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/createuser' element={<Register/>}/>
            <Route exact path='/myorder' element={<MyOrder/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
    
  );
}

export default App;

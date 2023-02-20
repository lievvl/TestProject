import HeaderComponent from './components/HeaderComponent';
import ListOrders from './components/ListOrders';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import AddOrder from './components/AddOrder';

function App() {
  return (
    <div className="App">
      <Router>
      <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path = "/" element = {<ListOrders />}></Route>
            <Route path = "/add-order" element = {<AddOrder />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DemoPage from './pages/demoPage/demoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<DemoPage/>}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import './App.css';

const App = () => (
  <div>
    <h1 className="title">The Spotify Music Quiz</h1>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/:auth" element={<Login />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </div>
);

export default App;

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { SongTable } from './SongTable/SongTable'
import { Statistics } from './Statistics/Statistics'

function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="app-wrapper">
      <h1>Vivid Milestone</h1>
      <button className={`nav-button ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
        {isNavOpen ? '✕' : '☰'}
      </button>
      <nav className={`nav-container ${isNavOpen ? 'open' : ''}`}>
        <ul className='nav-list'>
          <li>
            <div className='nav-item'
              onClick={() => {
                toggleNav();
                navigate('/');
              }}>
              <span className='nav-item-title'>楽曲リスト</span>
              <span className='nav-item-sub'>SONG LIST</span>
            </div>
          </li>
          <li>
            <div className='nav-item'
              onClick={() => {
                toggleNav();
                navigate('/stats');
              }}>
              <span className='nav-item-title'>統計</span>
              <span className='nav-item-sub'>STATISTICS</span>
            </div>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SongTable />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App

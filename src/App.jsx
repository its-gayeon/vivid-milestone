// import { useState } from 'react'
import './App.css'
import { SongTable } from './SongTable'

function App() {
  console.log('App component rendering');

  return (
    <div className="app-container">
      <h1>Vivid Milestone</h1>
      <SongTable />
    </div>
  )
}

export default App

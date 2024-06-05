import React from 'react'
import FetchApi from './components/fetchapi/FetchApi'
import './App.css'
import SearchApi from './components/searchapi/SearchApi'

function App() {
  return (
    <div className="hero">
      <h1>Get Random Quotes</h1>
      <FetchApi/>
      <SearchApi/>
    </div>
  )
}

export default App